import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PostsController {
  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { title, content, published = false } = req.body;

      const post = await prisma.post.create({
        data: {
          title,
          content,
          published,
          authorId: userId,
        },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            }
          }
        }
      });

      res.status(201).json({
        message: 'Post created successfully',
        data: post
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }

  static async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id);

      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            }
          }
        }
      });

      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.json({
        message: 'Post retrieved successfully',
        data: post
      });
    } catch (error) {
      console.error('Error getting post:', error);
      res.status(500).json({ error: 'Failed to get post' });
    }
  }

  static async getPublishedPosts(req: Request, res: Response): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 0;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: page * limit,
        take: limit,
      });

      res.json({
        message: 'Published posts retrieved successfully',
        data: posts
      });
    } catch (error) {
      console.error('Error getting published posts:', error);
      res.status(500).json({ error: 'Failed to get published posts' });
    }
  }

  static async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const postId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { title, content, published } = req.body;

      const post = await prisma.post.update({
        where: {
          id: postId,
          authorId: userId,
        },
        data: {
          title,
          content,
          published,
        },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            }
          }
        }
      });

      res.json({
        message: 'Post updated successfully',
        data: post
      });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }

  static async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const postId = parseInt(req.params.id);

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await prisma.post.delete({
        where: {
          id: postId,
          authorId: userId,
        },
      });

      res.json({
        message: 'Post deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
}
