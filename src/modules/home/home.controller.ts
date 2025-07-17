import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class HomeController {
  static async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Get user's recent activities
      const recentActivities = await prisma.activity.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        orderBy: {
          date: 'desc',
        },
        take: 5,
        select: {
          id: true,
          type: true,
          carbonValue: true,
          date: true,
          description: true,
        }
      });

      // Get user's active goals
      const activeGoals = await prisma.goal.findMany({
        where: {
          userId,
          isActive: true,
          deletedAt: null,
        },
        orderBy: {
          deadline: 'asc',
        },
        take: 5,
        select: {
          id: true,
          title: true,
          targetValue: true,
          currentValue: true,
          deadline: true,
          category: true,
        }
      });

      // Get carbon summary for current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const monthlyActivities = await prisma.activity.findMany({
        where: {
          userId,
          date: {
            gte: startOfMonth,
          },
          deletedAt: null,
        },
        select: {
          carbonValue: true,
          type: true,
        }
      });

      const totalCarbonThisMonth = monthlyActivities.reduce((sum, activity) => sum + activity.carbonValue, 0);
      const activityCountThisMonth = monthlyActivities.length;

      // Get user profile
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          firstName: true,
          lastName: true,
          email: true,
        }
      });

      res.json({
        message: 'Dashboard data retrieved successfully',
        data: {
          user,
          recentActivities,
          activeGoals,
          monthlyStats: {
            totalCarbon: totalCarbonThisMonth,
            activityCount: activityCountThisMonth,
          }
        }
      });
    } catch (error) {
      console.error('Error getting dashboard:', error);
      res.status(500).json({ error: 'Failed to get dashboard data' });
    }
  }

  static async getStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Get date range from query params
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(new Date().setDate(1)); // Start of current month
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

      // Get activities in date range
      const activities = await prisma.activity.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate,
          },
          deletedAt: null,
        },
        select: {
          carbonValue: true,
          type: true,
          date: true,
        }
      });

      // Calculate stats
      const totalCarbon = activities.reduce((sum, activity) => sum + activity.carbonValue, 0);
      const activityCount = activities.length;
      const averageCarbon = activityCount > 0 ? totalCarbon / activityCount : 0;

      // Group by type
      const byType = activities.reduce((acc, activity) => {
        if (!acc[activity.type]) {
          acc[activity.type] = { count: 0, totalCarbon: 0 };
        }
        acc[activity.type].count++;
        acc[activity.type].totalCarbon += activity.carbonValue;
        return acc;
      }, {} as Record<string, { count: number; totalCarbon: number }>);

      // Get goals summary
      const goals = await prisma.goal.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          targetValue: true,
          currentValue: true,
          isActive: true,
          completionDate: true,
          category: true,
        }
      });

      const totalGoals = goals.length;
      const activeGoals = goals.filter(g => g.isActive).length;
      const completedGoals = goals.filter(g => g.completionDate).length;
      const totalProgress = goals.reduce((sum, g) => sum + g.currentValue, 0);

      res.json({
        message: 'Stats retrieved successfully',
        data: {
          activities: {
            totalCarbon,
            activityCount,
            averageCarbon,
            byType,
          },
          goals: {
            totalGoals,
            activeGoals,
            completedGoals,
            totalProgress,
          },
          dateRange: {
            startDate,
            endDate,
          }
        }
      });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).json({ error: 'Failed to get stats' });
    }
  }
}
