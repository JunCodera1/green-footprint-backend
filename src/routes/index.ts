import { Router } from 'express';

const router = Router();

/**
 * @route   GET /api
 * @desc    API documentation and endpoints list
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Green Footprint API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: {
        base: '/api/auth',
        routes: [
          { method: 'POST', path: '/register', description: 'Register a new user' },
          { method: 'POST', path: '/login', description: 'Login user and get JWT token' },
          { method: 'GET', path: '/profile', description: 'Get user profile (Private)' },
          { method: 'PUT', path: '/profile', description: 'Update user profile (Private)' },
          { method: 'PUT', path: '/password', description: 'Change user password (Private)' },
        ]
      },
      activities: {
        base: '/api/activities',
        routes: [
          { method: 'POST', path: '/', description: 'Create a new activity (Private)' },
          { method: 'GET', path: '/', description: 'Get user activities with filters (Private)' },
          { method: 'GET', path: '/public', description: 'Get public activities (Public)' },
          { method: 'GET', path: '/summary', description: 'Get user carbon summary (Private)' },
          { method: 'GET', path: '/:id', description: 'Get activity by ID (Private)' },
          { method: 'PUT', path: '/:id', description: 'Update activity (Private)' },
          { method: 'DELETE', path: '/:id', description: 'Delete activity (Private)' },
        ]
      },
      goals: {
        base: '/api/goals',
        routes: [
          { method: 'POST', path: '/', description: 'Create a new goal (Private)' },
          { method: 'GET', path: '/', description: 'Get user goals with filters (Private)' },
          { method: 'GET', path: '/:id', description: 'Get goal by ID (Private)' },
          { method: 'PUT', path: '/:id', description: 'Update goal (Private)' },
          { method: 'DELETE', path: '/:id', description: 'Delete goal (Private)' },
        ]
      },
      users: {
        base: '/api/users',
        routes: [
          { method: 'GET', path: '/profile', description: 'Get current user profile (Private)' },
          { method: 'PUT', path: '/profile', description: 'Update current user profile (Private)' },
          { method: 'GET', path: '/:id', description: 'Get public user profile (Public)' },
        ]
      },
      posts: {
        base: '/api/posts',
        routes: [
          { method: 'POST', path: '/', description: 'Create a new post (Private)' },
          { method: 'GET', path: '/', description: 'Get published posts (Public)' },
          { method: 'GET', path: '/:id', description: 'Get post by ID (Public)' },
          { method: 'PUT', path: '/:id', description: 'Update post (Private)' },
          { method: 'DELETE', path: '/:id', description: 'Delete post (Private)' },
        ]
      },
      home: {
        base: '/api/home',
        routes: [
          { method: 'GET', path: '/dashboard', description: 'Get user dashboard data (Private)' },
          { method: 'GET', path: '/stats', description: 'Get user statistics (Private)' },
        ]
      }
    },
    authentication: {
      type: 'JWT',
      header: 'Authorization: Bearer <token>',
      note: 'Private routes require authentication'
    },
    health: {
      endpoint: '/health',
      description: 'Check if the server is running'
    }
  });
});

export default router;
