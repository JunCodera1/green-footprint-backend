import { PrismaClient } from '@prisma/client';
import { CreateActivityRequest, UpdateActivityRequest, ActivityResponse, ActivityFilters } from './activities.types';

const prisma = new PrismaClient();

export class ActivitiesService {
  static async createActivity(userId: number, data: CreateActivityRequest): Promise<ActivityResponse> {
    const activity = await prisma.activity.create({
      data: {
        userId,
        type: data.type,
        customType: data.customType,
        description: data.description,
        carbonValue: data.carbonValue,
        date: data.date || new Date(),
        location: data.location,
        source: data.source,
        tags: data.tags || [],
        mediaUrl: data.mediaUrl,
        notes: data.notes,
        isPublic: data.isPublic ?? true,
      },
    });

    return activity as ActivityResponse;
  }

  static async getActivityById(activityId: number, userId: number): Promise<ActivityResponse | null> {
    const activity = await prisma.activity.findFirst({
      where: {
        id: activityId,
        OR: [
          { userId },
          { isPublic: true }
        ],
        deletedAt: null,
      },
    });

    return activity as ActivityResponse | null;
  }

  static async getUserActivities(userId: number, filters: ActivityFilters = {}): Promise<ActivityResponse[]> {
    const where: any = {
      userId,
      deletedAt: null,
    };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = filters.startDate;
      if (filters.endDate) where.date.lte = filters.endDate;
    }

    if (filters.minCarbonValue || filters.maxCarbonValue) {
      where.carbonValue = {};
      if (filters.minCarbonValue) where.carbonValue.gte = filters.minCarbonValue;
      if (filters.maxCarbonValue) where.carbonValue.lte = filters.maxCarbonValue;
    }

    if (filters.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags,
      };
    }

    if (filters.isPublic !== undefined) {
      where.isPublic = filters.isPublic;
    }

    const activities = await prisma.activity.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
      skip: (filters.page || 0) * (filters.limit || 10),
      take: filters.limit || 10,
    });

    return activities as ActivityResponse[];
  }

  static async updateActivity(activityId: number, userId: number, data: UpdateActivityRequest): Promise<ActivityResponse> {
    const activity = await prisma.activity.update({
      where: {
        id: activityId,
        userId,
      },
      data: {
        type: data.type,
        customType: data.customType,
        description: data.description,
        carbonValue: data.carbonValue,
        date: data.date,
        location: data.location,
        source: data.source,
        tags: data.tags,
        mediaUrl: data.mediaUrl,
        notes: data.notes,
        isPublic: data.isPublic,
      },
    });

    return activity as ActivityResponse;
  }

  static async deleteActivity(activityId: number, userId: number): Promise<void> {
    await prisma.activity.update({
      where: {
        id: activityId,
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  static async getPublicActivities(filters: ActivityFilters = {}): Promise<ActivityResponse[]> {
    const where: any = {
      isPublic: true,
      deletedAt: null,
    };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = filters.startDate;
      if (filters.endDate) where.date.lte = filters.endDate;
    }

    const activities = await prisma.activity.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      skip: (filters.page || 0) * (filters.limit || 10),
      take: filters.limit || 10,
    });

    return activities as ActivityResponse[];
  }

  static async getUserCarbonSummary(userId: number, startDate?: Date, endDate?: Date): Promise<{
    totalCarbonValue: number;
    activityCount: number;
    averageCarbonValue: number;
    byType: Record<string, { count: number; totalCarbon: number }>;
  }> {
    const where: any = {
      userId,
      deletedAt: null,
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const activities = await prisma.activity.findMany({
      where,
      select: {
        type: true,
        carbonValue: true,
      },
    });

    const summary = {
      totalCarbonValue: 0,
      activityCount: activities.length,
      averageCarbonValue: 0,
      byType: {} as Record<string, { count: number; totalCarbon: number }>,
    };

    activities.forEach(activity => {
      summary.totalCarbonValue += activity.carbonValue;

      if (!summary.byType[activity.type]) {
        summary.byType[activity.type] = { count: 0, totalCarbon: 0 };
      }

      summary.byType[activity.type].count++;
      summary.byType[activity.type].totalCarbon += activity.carbonValue;
    });

    summary.averageCarbonValue = summary.activityCount > 0
      ? summary.totalCarbonValue / summary.activityCount
      : 0;

    return summary;
  }
}
