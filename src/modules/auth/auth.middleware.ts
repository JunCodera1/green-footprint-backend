import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './auth.types';

/**
 * Middleware to authenticate JWT token
 */
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: 'Access token required' });
      return;
    }

    // Verify token
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.message === 'Invalid token') {
      res.status(403).json({ message: 'Invalid or expired token' });
    } else {
      console.error('Authentication error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

/**
 * Optional authentication middleware
 * Continues even if no token is provided
 */
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = AuthService.verifyToken(token);
      req.user = decoded;
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

/**
 * Role-based authorization middleware
 */
export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // For now, we'll implement basic role checking
    // In the future, you can add role field to user model
    const userRole = (req.user as any).role || 'user';

    if (!roles.includes(userRole)) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }

    next();
  };
}; 