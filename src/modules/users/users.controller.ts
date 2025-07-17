import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UsersController {
  static async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
          profile: {
            select: {
              id: true,
              bio: true,
            }
          }
        }
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        message: 'User profile retrieved successfully',
        data: user
      });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({ error: 'Failed to get user profile' });
    }
  }

  static async updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { firstName, lastName, bio } = req.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          profile: {
            upsert: {
              create: { bio },
              update: { bio }
            }
          }
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          updatedAt: true,
          profile: {
            select: {
              id: true,
              bio: true,
            }
          }
        }
      });

      res.json({
        message: 'User profile updated successfully',
        data: user
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  }

  static async getPublicUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profile: {
            select: {
              bio: true,
            }
          }
        }
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        message: 'Public user profile retrieved successfully',
        data: user
      });
    } catch (error) {
      console.error('Error getting public user profile:', error);
      res.status(500).json({ error: 'Failed to get public user profile' });
    }
  }
}
