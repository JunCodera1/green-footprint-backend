import { Request, Response } from 'express';
import { ActivitiesService } from './activities.service';
import { CreateActivityRequest, UpdateActivityRequest, ActivityFilters } from './activities.types';

export class ActivitiesController {
  static async createActivity(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const activityData: CreateActivityRequest = req.body;
      const activity = await ActivitiesService.createActivity(userId, activityData);

      res.status(201).json({
        message: 'Activity created successfully',
        data: activity
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      res.status(500).json({ error: 'Failed to create activity' });
    }
  }

  static async getActivityById(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const activityId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const activity = await ActivitiesService.getActivityById(activityId, userId);

      if (!activity) {
        res.status(404).json({ error: 'Activity not found' });
        return;
      }

      res.json({
        message: 'Activity retrieved successfully',
        data: activity
      });
    } catch (error) {
      console.error('Error getting activity:', error);
      res.status(500).json({ error: 'Failed to get activity' });
    }
  }

  static async getUserActivities(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const filters: ActivityFilters = {
        type: req.query.type as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        minCarbonValue: req.query.minCarbonValue ? parseFloat(req.query.minCarbonValue as string) : undefined,
        maxCarbonValue: req.query.maxCarbonValue ? parseFloat(req.query.maxCarbonValue as string) : undefined,
        tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
        isPublic: req.query.isPublic !== undefined ? req.query.isPublic === 'true' : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 0,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };

      const activities = await ActivitiesService.getUserActivities(userId, filters);

      res.json({
        message: 'Activities retrieved successfully',
        data: activities
      });
    } catch (error) {
      console.error('Error getting user activities:', error);
      res.status(500).json({ error: 'Failed to get activities' });
    }
  }

  static async updateActivity(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const activityId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const updateData: UpdateActivityRequest = req.body;
      const activity = await ActivitiesService.updateActivity(activityId, userId, updateData);

      res.json({
        message: 'Activity updated successfully',
        data: activity
      });
    } catch (error) {
      console.error('Error updating activity:', error);
      res.status(500).json({ error: 'Failed to update activity' });
    }
  }

  static async deleteActivity(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const activityId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await ActivitiesService.deleteActivity(activityId, userId);

      res.json({
        message: 'Activity deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting activity:', error);
      res.status(500).json({ error: 'Failed to delete activity' });
    }
  }

  static async getPublicActivities(req: Request, res: Response): Promise<void> {
    try {
      const filters: ActivityFilters = {
        type: req.query.type as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 0,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };

      const activities = await ActivitiesService.getPublicActivities(filters);

      res.json({
        message: 'Public activities retrieved successfully',
        data: activities
      });
    } catch (error) {
      console.error('Error getting public activities:', error);
      res.status(500).json({ error: 'Failed to get public activities' });
    }
  }

  static async getUserCarbonSummary(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const summary = await ActivitiesService.getUserCarbonSummary(userId, startDate, endDate);

      res.json({
        message: 'Carbon summary retrieved successfully',
        data: summary
      });
    } catch (error) {
      console.error('Error getting carbon summary:', error);
      res.status(500).json({ error: 'Failed to get carbon summary' });
    }
  }
}
