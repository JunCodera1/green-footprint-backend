import { validateRegister, validateLogin } from '../../../modules/auth/auth.validation';
import { validationHelpers } from '../../utils/test-helpers';


describe('Auth Validation', () => {
  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'SecurePass123',
        firstName: 'John',
        lastName: 'Doe'
      };

      const { error } = validateRegister(validData);
      expect(error).toBeUndefined();
    });

    it('should validate registration data without optional fields', () => {
      const validData = {
        email: 'test@example.com',
        password: 'SecurePass123'
      };

      const { error } = validateRegister(validData);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email format', () => {
      validationHelpers.invalidEmails.forEach((email: string) => {
        const invalidData = {
          email,
          password: 'SecurePass123'
        };

        const { error } = validateRegister(invalidData);
        expect(error).toBeDefined();
        expect(error?.details.some(detail => detail.message.includes('valid email'))).toBe(true);
      });
    });

    it('should reject weak passwords', () => {
      validationHelpers.invalidPasswords.forEach((password: string) => {
        const invalidData = {
          email: 'test@example.com',
          password
        };

        const { error } = validateRegister(invalidData);
        expect(error).toBeDefined();
      });
    });

    it('should accept strong passwords', () => {
      validationHelpers.validPasswords.forEach((password: string) => {
        const validData = {
          email: 'test@example.com',
          password
        };

        const { error } = validateRegister(validData);
        expect(error).toBeUndefined();
      });
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        email: 'test@example.com'
        // missing password
      };

      const { error } = validateRegister(invalidData);
      expect(error).toBeDefined();
      expect(error?.details.some(detail => detail.message.includes('required'))).toBe(true);
    });

    it('should reject firstName longer than 50 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'SecurePass123',
        firstName: 'A'.repeat(51)
      };

      const { error } = validateRegister(invalidData);
      expect(error).toBeDefined();
      expect(error?.details.some(detail => detail.message.includes('50 characters'))).toBe(true);
    });

    it('should reject lastName longer than 50 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'SecurePass123',
        lastName: 'A'.repeat(51)
      };

      const { error } = validateRegister(invalidData);
      expect(error).toBeDefined();
      expect(error?.details.some(detail => detail.message.includes('50 characters'))).toBe(true);
    });
  });

  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'SecurePass123'
      };

      const { error } = validateLogin(validData);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email format', () => {
      validationHelpers.invalidEmails.forEach((email: string) => {
        const invalidData = {
          email,
          password: 'SecurePass123'
        };

        const { error } = validateLogin(invalidData);
        expect(error).toBeDefined();
        expect(error?.details.some(detail => detail.message.includes('valid email'))).toBe(true);
      });
    });

    it('should reject missing email', () => {
      const invalidData = {
        password: 'SecurePass123'
      };

      const { error } = validateLogin(invalidData);
      expect(error).toBeDefined();
      expect(error?.details.some(detail => detail.message.includes('required'))).toBe(true);
    });

    it('should reject missing password', () => {
      const invalidData = {
        email: 'test@example.com'
      };

      const { error } = validateLogin(invalidData);
      expect(error).toBeDefined();
      expect(error?.details.some(detail => detail.message.includes('required'))).toBe(true);
    });

    it('should accept any password format for login', () => {
      const weakPasswords = ['weak', '123', 'password'];

      weakPasswords.forEach((password: string) => {
        const validData = {
          email: 'test@example.com',
          password
        };

        const { error } = validateLogin(validData);
        expect(error).toBeUndefined();
      });
    });
  });
}); 