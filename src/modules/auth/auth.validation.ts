import Joi from 'joi';
import { RegisterRequest, LoginRequest } from './auth.types';

export const registerSchema = Joi.object<RegisterRequest>({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'any.required': 'Password is required'
    }),
  firstName: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.max': 'First name must be less than 50 characters'
    }),
  lastName: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.max': 'Last name must be less than 50 characters'
    })
});

export const loginSchema = Joi.object<LoginRequest>({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

export const validateRegister = (data: Partial<RegisterRequest>) => {
  return registerSchema.validate(data, { abortEarly: false });
};

export const validateLogin = (data: Partial<LoginRequest>) => {
  return loginSchema.validate(data, { abortEarly: false });
}; 