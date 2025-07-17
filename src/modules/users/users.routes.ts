import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/profile', authenticateToken as any, UsersController.getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile
 * @access  Private
 */
router.put('/profile', authenticateToken as any, UsersController.updateUserProfile);

/**
 * @route   GET /api/users/:id
 * @desc    Get public user profile
 * @access  Public
 */
router.get('/:id', UsersController.getPublicUserProfile);

export default router; 