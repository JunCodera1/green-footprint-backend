import jwt from 'jsonwebtoken';

export const TEST_JWT_SECRET = 'test-secret-key-for-jest-tests-only-minimum-32-chars';

/**
 * Generate a test JWT token
 */
export const generateTestToken = (payload: any = {}) => {
  const defaultPayload = {
    userId: 1,
    email: 'test@example.com',
    ...payload
  };

  return jwt.sign(defaultPayload, TEST_JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Create mock request object for testing
 */
export const createMockRequest = (data: any = {}) => {
  return {
    body: data.body || {},
    params: data.params || {},
    query: data.query || {},
    headers: data.headers || {},
    user: data.user || null,
  } as any;
};

/**
 * Create mock response object for testing
 */
export const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

/**
 * Create mock next function for testing middleware
 */
export const createMockNext = () => {
  return jest.fn();
};

/**
 * Test database utilities
 */
export const testDbHelpers = {
  /**
   * Clear all tables (for integration tests)
   */
  clearDatabase: async (prisma: any) => {
    // Add table clearing logic here when needed
    // await prisma.user.deleteMany();
    // await prisma.activity.deleteMany();
    // etc.
  },

  /**
   * Create test user
   */
  createTestUser: async (prisma: any, userData: any = {}) => {
    const defaultUser = {
      email: 'test@example.com',
      password: 'hashedpassword',
      firstName: 'Test',
      lastName: 'User',
      ...userData
    };

    return await prisma.user.create({
      data: defaultUser
    });
  }
};

/**
 * Validation test helpers
 */
export const validationHelpers = {
  /**
   * Test valid email formats
   */
  validEmails: [
    'test@example.com',
    'user.name@domain.co.uk',
    'user+tag@example.org'
  ],

  /**
   * Test invalid email formats
   */
  invalidEmails: [
    'invalid-email',
    '@example.com',
    'user@',
    'user@.com'
  ],

  /**
   * Test valid password formats
   */
  validPasswords: [
    'SecurePass123',
    'MyPassword1',
    'ComplexP@ss1'
  ],

  /**
   * Test invalid password formats
   */
  invalidPasswords: [
    'weak',
    'nouppercase123',
    'NOLOWERCASE123',
    'NoNumbers',
    'short1'
  ]
}; 