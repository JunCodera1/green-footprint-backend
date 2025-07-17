import { Router } from 'express';
import { PostsController } from './posts.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = Router();

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
router.post('/', authenticateToken as any, PostsController.createPost);

/**
 * @route   GET /api/posts
 * @desc    Get published posts
 * @access  Public
 */
router.get('/', PostsController.getPublishedPosts);

/**
 * @route   GET /api/posts/:id
 * @desc    Get post by ID
 * @access  Public
 */
router.get('/:id', PostsController.getPostById);

/**
 * @route   PUT /api/posts/:id
 * @desc    Update post
 * @access  Private
 */
router.put('/:id', authenticateToken as any, PostsController.updatePost);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete post
 * @access  Private
 */
router.delete('/:id', authenticateToken as any, PostsController.deletePost);

export default router; 