import { Router } from 'express';
import { ActivitiesController } from './activities.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

/**
 * @route   POST /api/activities
 * @desc    Create a new activity
 * @access  Private
 */
router.post('/', authenticateToken as any, ActivitiesController.createActivity as any);

/**
 * @route   GET /api/activities
 * @desc    Get user's activities with filters
 * @access  Private
 */
router.get('/', authenticateToken as any, ActivitiesController.getUserActivities as any);

/**
 * @route   GET /api/activities/public
 * @desc    Get public activities
 * @access  Public
 */
router.get('/public', ActivitiesController.getPublicActivities as any);

/**
 * @route   GET /api/activities/summary
 * @desc    Get user's carbon summary
 * @access  Private
 */
router.get('/summary', authenticateToken as any, ActivitiesController.getUserCarbonSummary as any);

/**
 * @route   GET /api/activities/:id
 * @desc    Get activity by ID
 * @access  Private
 */
router.get('/:id', authenticateToken as any, ActivitiesController.getActivityById as any);

/**
 * @route   PUT /api/activities/:id
 * @desc    Update activity
 * @access  Private
 */
router.put('/:id', authenticateToken as any, ActivitiesController.updateActivity as any);

/**
 * @route   DELETE /api/activities/:id
 * @desc    Delete activity
 * @access  Private
 */
router.delete('/:id', authenticateToken as any, ActivitiesController.deleteActivity as any);

export default router; 