import { AuthService } from '../../../src/modules/auth/auth.service';
import { RegisterRequest, LoginRequest } from '../../../src/modules/auth/auth.types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mUser = {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => ({
      user: mUser,
    })),
  };
});

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: '$2a$10$hashedpassword',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    const mockUserData: RegisterRequest = {
      email: 'test@example.com',
      password: 'SecurePass123',
      firstName: 'John',
      lastName: 'Doe',
    };

    it('should register a new user successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await AuthService.registerUser(mockUserData);
      expect(result.message).toBe('User registered successfully');
      expect(result.userId).toBe(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(AuthService.registerUser(mockUserData))
        .rejects
        .toThrow('Email is already registered');
    });
  });

  describe('loginUser', () => {
    const mockLoginData: LoginRequest = {
      email: 'test@example.com',
      password: 'SecurePass123',
    };

    it('should login user successfully with valid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await AuthService.loginUser(mockLoginData);
      expect(result.message).toBe('Login successful');
      expect(result.token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user?.email).toBe('test@example.com');
    });

    it('should throw error for invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(AuthService.loginUser(mockLoginData))
        .rejects
        .toThrow('Invalid credentials');
    });

    it('should throw error for incorrect password', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      await expect(AuthService.loginUser(mockLoginData))
        .rejects
        .toThrow('Invalid credentials');
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      const result = await AuthService.getUserProfile(1);
      expect(result.id).toBe(1);
      expect(result.email).toBe('test@example.com');
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
    });

    it('should throw error if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(AuthService.getUserProfile(999))
        .rejects
        .toThrow('User not found');
    });
  });

  describe('verifyToken', () => {
    it('should verify valid JWT token', () => {
      const mockPayload = {
        userId: 1,
        email: 'test@example.com',
        iat: Date.now(),
        exp: Date.now() + 3600000,
      };
      const jwt = require('jsonwebtoken');
      jest.spyOn(jwt, 'verify').mockReturnValue(mockPayload);
      const result = AuthService.verifyToken('valid-token');
      expect(result).toEqual(mockPayload);
    });

    it('should throw error for invalid token', () => {
      const jwt = require('jsonwebtoken');
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });
      expect(() => AuthService.verifyToken('invalid-token'))
        .toThrow('Invalid token');
    });
  });
}); 