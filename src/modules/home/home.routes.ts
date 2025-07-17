import { Router } from 'express';
import { HomeController } from './home.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

/**
 * @route   GET /api/home/dashboard
 * @desc    Get user dashboard data
 * @access  Private
 */
router.get('/dashboard', authenticateToken as any, HomeController.getDashboard);

/**
 * @route   GET /api/home/stats
 * @desc    Get user statistics
 * @access  Private
 */
router.get('/stats', authenticateToken as any, HomeController.getStats);

export default router; 