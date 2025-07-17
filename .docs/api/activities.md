# Activities API Documentation

## Overview

The activities module allows users to track their environmental activities and calculate carbon footprint impact.

## Base URL

```
http://localhost:3000/api/activities
```

## Activity Types

| Type | Description | Carbon Impact |
|------|-------------|---------------|
| `TRANSPORTATION` | Car, bike, public transport | Variable |
| `ENERGY` | Electricity, heating, cooling | High |
| `FOOD` | Diet choices, food waste | Medium |
| `WASTE` | Recycling, composting | Low |
| `WATER` | Water usage, conservation | Low |
| `OTHER` | Custom activities | Variable |

## Endpoints

### Get User Activities

**GET** `/`

Get all activities for the authenticated user.

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `type` | string | Filter by activity type |
| `startDate` | string | Filter from date (YYYY-MM-DD) |
| `endDate` | string | Filter to date (YYYY-MM-DD) |

#### Response

**Success (200)**
```json
{
  "activities": [
    {
      "id": 1,
      "type": "TRANSPORTATION",
      "customType": "Car",
      "description": "Drove to work",
      "carbonValue": 2.5,
      "date": "2024-01-15T08:00:00Z",
      "location": "Home to Office",
      "source": "Manual entry",
      "tags": ["work", "daily"],
      "verificationStatus": "VERIFIED",
      "mediaUrl": null,
      "notes": "Regular commute",
      "isPublic": true,
      "createdAt": "2024-01-15T08:30:00Z",
      "updatedAt": "2024-01-15T08:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Create Activity

**POST** `/`

Create a new activity entry.

#### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "type": "TRANSPORTATION",
  "customType": "Car",
  "description": "Drove to work",
  "carbonValue": 2.5,
  "date": "2024-01-15T08:00:00Z",
  "location": "Home to Office",
  "source": "Manual entry",
  "tags": ["work", "daily"],
  "notes": "Regular commute",
  "isPublic": true
}
```

#### Response

**Success (201)**
```json
{
  "message": "Activity created successfully",
  "activity": {
    "id": 1,
    "type": "TRANSPORTATION",
    "customType": "Car",
    "description": "Drove to work",
    "carbonValue": 2.5,
    "date": "2024-01-15T08:00:00Z",
    "location": "Home to Office",
    "source": "Manual entry",
    "tags": ["work", "daily"],
    "verificationStatus": "PENDING",
    "mediaUrl": null,
    "notes": "Regular commute",
    "isPublic": true,
    "createdAt": "2024-01-15T08:30:00Z",
    "updatedAt": "2024-01-15T08:30:00Z"
  }
}
```

### Get Activity by ID

**GET** `/:id`

Get a specific activity by ID.

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Response

**Success (200)**
```json
{
  "id": 1,
  "type": "TRANSPORTATION",
  "customType": "Car",
  "description": "Drove to work",
  "carbonValue": 2.5,
  "date": "2024-01-15T08:00:00Z",
  "location": "Home to Office",
  "source": "Manual entry",
  "tags": ["work", "daily"],
  "verificationStatus": "VERIFIED",
  "mediaUrl": null,
  "notes": "Regular commute",
  "isPublic": true,
  "createdAt": "2024-01-15T08:30:00Z",
  "updatedAt": "2024-01-15T08:30:00Z"
}
```

### Update Activity

**PUT** `/:id`

Update an existing activity.

#### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "description": "Updated description",
  "carbonValue": 3.0,
  "notes": "Updated notes"
}
```

#### Response

**Success (200)**
```json
{
  "message": "Activity updated successfully",
  "activity": {
    "id": 1,
    "type": "TRANSPORTATION",
    "customType": "Car",
    "description": "Updated description",
    "carbonValue": 3.0,
    "date": "2024-01-15T08:00:00Z",
    "location": "Home to Office",
    "source": "Manual entry",
    "tags": ["work", "daily"],
    "verificationStatus": "VERIFIED",
    "mediaUrl": null,
    "notes": "Updated notes",
    "isPublic": true,
    "createdAt": "2024-01-15T08:30:00Z",
    "updatedAt": "2024-01-15T09:00:00Z"
  }
}
```

### Delete Activity

**DELETE** `/:id`

Delete an activity (soft delete).

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Response

**Success (200)**
```json
{
  "message": "Activity deleted successfully"
}
```

## Carbon Value Guidelines

### Transportation
- **Car (gasoline)**: 2.3 kg CO2/km
- **Car (electric)**: 0.5 kg CO2/km
- **Bus**: 0.1 kg CO2/km
- **Train**: 0.04 kg CO2/km
- **Bicycle**: 0 kg CO2/km

### Energy
- **Electricity**: 0.5 kg CO2/kWh
- **Natural Gas**: 2.0 kg CO2/m³
- **Heating Oil**: 2.7 kg CO2/liter

### Food
- **Beef**: 13.3 kg CO2/kg
- **Pork**: 4.6 kg CO2/kg
- **Chicken**: 2.9 kg CO2/kg
- **Vegetables**: 0.4 kg CO2/kg

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Not owner of activity |
| 404 | Not Found - Activity not found |
| 500 | Internal Server Error |

## Validation Rules

- `type`: Must be one of the defined activity types
- `carbonValue`: Must be a positive number
- `date`: Must be a valid date
- `description`: Maximum 500 characters
- `location`: Maximum 255 characters
- `tags`: Array of strings, maximum 10 tags 