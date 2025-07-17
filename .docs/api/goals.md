# Goals API Documentation

## Overview

The goals module allows users to set environmental targets and track their progress towards sustainability goals.

## Base URL

```
http://localhost:3000/api/goals
```

## Goal Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `TRANSPORT` | Transportation-related goals | Reduce car usage, increase cycling |
| `ENERGY` | Energy consumption goals | Reduce electricity usage, switch to renewables |
| `FOOD` | Food-related goals | Reduce meat consumption, minimize food waste |
| `LIFESTYLE` | General lifestyle goals | Reduce plastic usage, sustainable shopping |
| `OTHER` | Custom goals | Any other environmental targets |

## Recurring Types

| Type | Description |
|------|-------------|
| `NONE` | One-time goal |
| `WEEKLY` | Repeats weekly |
| `MONTHLY` | Repeats monthly |
| `YEARLY` | Repeats yearly |

## Endpoints

### Get User Goals

**GET** `/`

Get all goals for the authenticated user.

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `category` | string | Filter by goal category |
| `isActive` | boolean | Filter by active status |
| `deadline` | string | Filter by deadline (YYYY-MM-DD) |

#### Response

**Success (200)**
```json
{
  "goals": [
    {
      "id": 1,
      "title": "Reduce Car Usage",
      "targetValue": 100,
      "currentValue": 75,
      "deadline": "2024-12-31T23:59:59Z",
      "isActive": true,
      "description": "Reduce car usage by 100km per month",
      "category": "TRANSPORT",
      "notes": "Focus on cycling and public transport",
      "recurring": "MONTHLY",
      "completionDate": null,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "progressHistory": [
        {
          "id": 1,
          "value": 25,
          "date": "2024-01-15T10:30:00Z"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

### Create Goal

**POST** `/`

Create a new environmental goal.

#### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "title": "Reduce Car Usage",
  "targetValue": 100,
  "deadline": "2024-12-31T23:59:59Z",
  "description": "Reduce car usage by 100km per month",
  "category": "TRANSPORT",
  "notes": "Focus on cycling and public transport",
  "recurring": "MONTHLY"
}
```

#### Response

**Success (201)**
```json
{
  "message": "Goal created successfully",
  "goal": {
    "id": 1,
    "title": "Reduce Car Usage",
    "targetValue": 100,
    "currentValue": 0,
    "deadline": "2024-12-31T23:59:59Z",
    "isActive": true,
    "description": "Reduce car usage by 100km per month",
    "category": "TRANSPORT",
    "notes": "Focus on cycling and public transport",
    "recurring": "MONTHLY",
    "completionDate": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Goal by ID

**GET** `/:id`

Get a specific goal by ID.

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Response

**Success (200)**
```json
{
  "id": 1,
  "title": "Reduce Car Usage",
  "targetValue": 100,
  "currentValue": 75,
  "deadline": "2024-12-31T23:59:59Z",
  "isActive": true,
  "description": "Reduce car usage by 100km per month",
  "category": "TRANSPORT",
  "notes": "Focus on cycling and public transport",
  "recurring": "MONTHLY",
  "completionDate": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "progressHistory": [
    {
      "id": 1,
      "value": 25,
      "date": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "value": 50,
      "date": "2024-01-30T10:30:00Z"
    }
  ]
}
```

### Update Goal

**PUT** `/:id`

Update an existing goal.

#### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "title": "Updated Goal Title",
  "targetValue": 150,
  "description": "Updated description",
  "notes": "Updated notes"
}
```

#### Response

**Success (200)**
```json
{
  "message": "Goal updated successfully",
  "goal": {
    "id": 1,
    "title": "Updated Goal Title",
    "targetValue": 150,
    "currentValue": 75,
    "deadline": "2024-12-31T23:59:59Z",
    "isActive": true,
    "description": "Updated description",
    "category": "TRANSPORT",
    "notes": "Updated notes",
    "recurring": "MONTHLY",
    "completionDate": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

### Add Progress Update

**POST** `/:id/progress`

Add a progress update to a goal.

#### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "value": 25
}
```

#### Response

**Success (201)**
```json
{
  "message": "Progress updated successfully",
  "progress": {
    "id": 3,
    "goalId": 1,
    "value": 25,
    "date": "2024-01-15T12:00:00Z"
  },
  "goal": {
    "id": 1,
    "currentValue": 100,
    "targetValue": 100,
    "isActive": false,
    "completionDate": "2024-01-15T12:00:00Z"
  }
}
```

### Delete Goal

**DELETE** `/:id`

Delete a goal (soft delete).

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Response

**Success (200)**
```json
{
  "message": "Goal deleted successfully"
}
```

## Goal Status

### Active Goals
- Goals that are currently being tracked
- `isActive: true`
- `completionDate: null`

### Completed Goals
- Goals that have reached their target
- `isActive: false`
- `completionDate: <date>`
- `currentValue >= targetValue`

### Overdue Goals
- Goals past their deadline without completion
- `deadline < current_date`
- `currentValue < targetValue`

## Progress Tracking

### Progress Calculation
```typescript
const progressPercentage = (currentValue / targetValue) * 100;
const remainingValue = targetValue - currentValue;
```

### Progress History
- Each progress update is stored with timestamp
- Allows for trend analysis and visualization
- Supports goal completion tracking

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Not owner of goal |
| 404 | Not Found - Goal not found |
| 500 | Internal Server Error |

## Validation Rules

- `title`: Required, maximum 255 characters
- `targetValue`: Required, positive number
- `deadline`: Required, future date
- `category`: Must be one of the defined categories
- `recurring`: Must be one of the defined recurring types
- `description`: Maximum 1000 characters
- `notes`: Maximum 500 characters 