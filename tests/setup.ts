// Jest setup file
import dotenv from 'dotenv';

// Load environment variables for tests
dotenv.config({ path: '.env.test' });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test timeout
jest.setTimeout(10000);

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-jest-tests-only';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db'; 