import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { validateRegister, validateLogin } from './auth.validation';
import { RegisterRequest, LoginRequest, AuthenticatedRequest } from './auth.types';

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const data: RegisterRequest = req.body;

      // Validate input
      const { error } = validateRegister(data);
      if (error) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      // Register user
      const result = await AuthService.registerUser(data);
      res.status(201).json(result);
    } catch (error: any) {
      if (error.message === 'Email is already registered') {
        res.status(400).json({ message: error.message });
      } else {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginRequest = req.body;

      // Validate input
      const { error } = validateLogin(data);
      if (error) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
        return;
      }

      // Login user
      const result = await AuthService.loginUser(data);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({ message: error.message });
      } else {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  /**
   * Get user profile
   */
  static async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const user = await AuthService.getUserProfile(userId);
      res.status(200).json({ user });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ message: error.message });
      } else {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const { firstName, lastName } = req.body as { firstName?: string; lastName?: string };
      const updatedUser = await AuthService.updateUserProfile(userId, { firstName, lastName });

      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Change password
   */
  static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };

      if (!currentPassword || !newPassword) {
        res.status(400).json({ message: 'Current password and new password are required' });
        return;
      }

      await AuthService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error: any) {
      if (error.message === 'Current password is incorrect') {
        res.status(400).json({ message: error.message });
      } else {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
} 