# Authentication API Documentation

## Overview

The authentication module provides user registration, login, and token management functionality using JWT (JSON Web Tokens).

## Base URL

```
http://localhost:3000/api/auth
```

## Endpoints

### Register User

**POST** `/register`

Register a new user account.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Response

**Success (201)**
```json
{
  "message": "Register successful!",
  "userId": 1
}
```

**Error (400)**
```json
{
  "message": "Email and password are required."
}
```

**Error (400)**
```json
{
  "message": "Email is already used."
}
```

### Login User

**POST** `/login`

Authenticate user and return JWT token.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Response

**Success (200)**
```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401)**
```json
{
  "message": "Invalid credentials."
}
```

### Get User Profile

**GET** `/profile`

Get current user profile (requires authentication).

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Response

**Success (200)**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Error (401)**
```json
{
  "message": "No token provided."
}
```

## Authentication Middleware

The `authenticateToken` middleware can be used to protect routes:

```typescript
import { authenticateToken } from '../controllers/auth-controller';

router.get('/protected', authenticateToken, (req, res) => {
  // Access user data via req.user
  res.json({ user: req.user });
});
```

## JWT Token Structure

```json
{
  "userId": 1,
  "email": "user@example.com",
  "iat": 1642234567,
  "exp": 1642839367
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Missing required fields |
| 401 | Unauthorized - Invalid credentials or missing token |
| 403 | Forbidden - Invalid token |
| 500 | Internal Server Error |

## Security Notes

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 7 days by default
- Tokens should be stored securely on the client side
- Use HTTPS in production environments 