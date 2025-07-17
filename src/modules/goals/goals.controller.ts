import { Request, Response } from 'express';
import { GoalsService } from './goals.service';

export class GoalsController {
  static async createGoal(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const goalData = req.body;
      const goal = await GoalsService.createGoal(userId, goalData);

      res.status(201).json({
        message: 'Goal created successfully',
        data: goal
      });
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ error: 'Failed to create goal' });
    }
  }

  static async getGoalById(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const goalId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const goal = await GoalsService.getGoalById(goalId, userId);

      if (!goal) {
        res.status(404).json({ error: 'Goal not found' });
        return;
      }

      res.json({
        message: 'Goal retrieved successfully',
        data: goal
      });
    } catch (error) {
      console.error('Error getting goal:', error);
      res.status(500).json({ error: 'Failed to get goal' });
    }
  }

  static async getUserGoals(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const filters = {
        category: req.query.category as string,
        isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
        recurring: req.query.recurring as string,
        page: req.query.page ? parseInt(req.query.page as string) : 0,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };

      const goals = await GoalsService.getUserGoals(userId, filters);

      res.json({
        message: 'Goals retrieved successfully',
        data: goals
      });
    } catch (error) {
      console.error('Error getting user goals:', error);
      res.status(500).json({ error: 'Failed to get goals' });
    }
  }

  static async updateGoal(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const goalId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const updateData = req.body;
      const goal = await GoalsService.updateGoal(goalId, userId, updateData);

      res.json({
        message: 'Goal updated successfully',
        data: goal
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      res.status(500).json({ error: 'Failed to update goal' });
    }
  }

  static async deleteGoal(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const goalId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await GoalsService.deleteGoal(goalId, userId);

      res.json({
        message: 'Goal deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      res.status(500).json({ error: 'Failed to delete goal' });
    }
  }
}
