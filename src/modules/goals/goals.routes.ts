import { Router } from 'express';
import { GoalsController } from './goals.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

/**
 * @route   POST /api/goals
 * @desc    Create a new goal
 * @access  Private
 */
router.post('/', authenticateToken as any, GoalsController.createGoal);

/**
 * @route   GET /api/goals
 * @desc    Get user's goals with filters
 * @access  Private
 */
router.get('/', authenticateToken as any, GoalsController.getUserGoals);

/**
 * @route   GET /api/goals/:id
 * @desc    Get goal by ID
 * @access  Private
 */
router.get('/:id', authenticateToken as any, GoalsController.getGoalById);

/**
 * @route   PUT /api/goals/:id
 * @desc    Update goal
 * @access  Private
 */
router.put('/:id', authenticateToken as any, GoalsController.updateGoal);

/**
 * @route   DELETE /api/goals/:id
 * @desc    Delete goal
 * @access  Private
 */
router.delete('/:id', authenticateToken as any, GoalsController.deleteGoal);

export default router; 