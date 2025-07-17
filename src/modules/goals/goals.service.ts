import { PrismaClient } from '@prisma/client';
import { CreateGoalRequest, UpdateGoalRequest, GoalResponse, GoalProgressRequest, GoalProgressResponse, GoalFilters } from './goals.types';

const prisma = new PrismaClient();

export class GoalsService {
  static async createGoal(userId: number, data: CreateGoalRequest): Promise<GoalResponse> {
    const goal = await prisma.goal.create({
      data: {
        userId,
        title: data.title,
        targetValue: data.targetValue,
        deadline: data.deadline,
        description: data.description,
        category: data.category,
        notes: data.notes,
        recurring: data.recurring || 'NONE',
      },
    });

    return goal as GoalResponse;
  }

  static async getGoalById(goalId: number, userId: number): Promise<GoalResponse | null> {
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId,
        deletedAt: null,
      },
      include: {
        progressHistory: {
          orderBy: {
            date: 'desc',
          },
          take: 10,
        },
      },
    });

    return goal as GoalResponse | null;
  }

  static async getUserGoals(userId: number, filters: GoalFilters = {}): Promise<GoalResponse[]> {
    const where: any = {
      userId,
      deletedAt: null,
    };

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.recurring) {
      where.recurring = filters.recurring;
    }

    const goals = await prisma.goal.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (filters.page || 0) * (filters.limit || 10),
      take: filters.limit || 10,
    });

    return goals as GoalResponse[];
  }

  static async updateGoal(goalId: number, userId: number, data: UpdateGoalRequest): Promise<GoalResponse> {
    const goal = await prisma.goal.update({
      where: {
        id: goalId,
        userId,
      },
      data: {
        title: data.title,
        targetValue: data.targetValue,
        deadline: data.deadline,
        description: data.description,
        category: data.category,
        notes: data.notes,
        recurring: data.recurring,
        isActive: data.isActive,
      },
    });

    return goal as GoalResponse;
  }

  static async deleteGoal(goalId: number, userId: number): Promise<void> {
    await prisma.goal.update({
      where: {
        id: goalId,
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  static async addGoalProgress(goalId: number, userId: number, data: GoalProgressRequest): Promise<GoalProgressResponse> {
    // Verify goal belongs to user
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId,
        deletedAt: null,
      },
    });

    if (!goal) {
      throw new Error('Goal not found');
    }

    // Create progress entry
    const progress = await prisma.goalProgress.create({
      data: {
        goalId,
        value: data.value,
        date: data.date || new Date(),
      },
    });

    // Update goal's current value
    const newCurrentValue = goal.currentValue + data.value;
    await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        currentValue: newCurrentValue,
        completionDate: newCurrentValue >= goal.targetValue ? new Date() : null,
      },
    });

    return progress as GoalProgressResponse;
  }

  static async getGoalProgress(goalId: number, userId: number): Promise<GoalProgressResponse[]> {
    // Verify goal belongs to user
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId,
        deletedAt: null,
      },
    });

    if (!goal) {
      throw new Error('Goal not found');
    }

    const progress = await prisma.goalProgress.findMany({
      where: {
        goalId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return progress as GoalProgressResponse[];
  }

  static async getUserGoalsSummary(userId: number): Promise<{
    totalGoals: number;
    activeGoals: number;
    completedGoals: number;
    totalProgress: number;
    byCategory: Record<string, { count: number; totalProgress: number }>;
  }> {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        category: true,
        targetValue: true,
        currentValue: true,
        isActive: true,
        completionDate: true,
      },
    });

    const summary = {
      totalGoals: goals.length,
      activeGoals: goals.filter(g => g.isActive).length,
      completedGoals: goals.filter(g => g.completionDate).length,
      totalProgress: goals.reduce((sum, g) => sum + g.currentValue, 0),
      byCategory: {} as Record<string, { count: number; totalProgress: number }>,
    };

    goals.forEach(goal => {
      const category = goal.category || 'OTHER';
      if (!summary.byCategory[category]) {
        summary.byCategory[category] = { count: 0, totalProgress: 0 };
      }

      summary.byCategory[category].count++;
      summary.byCategory[category].totalProgress += goal.currentValue;
    });

    return summary;
  }
}
