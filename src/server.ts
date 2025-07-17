import express from 'express';
import cors from 'cors';
import { config } from './main';
import authRoutes from './modules/auth/auth.routes';
import activitiesRoutes from './modules/activities/activities.routes';
import goalsRoutes from './modules/goals/goals.routes';
import usersRoutes from './modules/users/users.routes';
import postsRoutes from './modules/posts/posts.routes';
import homeRoutes from './modules/home/home.routes';
import apiDocsRoutes from './routes';

const app = express();
const PORT = config.app.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Green Footprint Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/home', homeRoutes);
app.use('/api', apiDocsRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Green Footprint Backend server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.app.env}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});

export default app; 