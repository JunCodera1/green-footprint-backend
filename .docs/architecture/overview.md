# System Architecture Overview

## Introduction

Green Footprint Backend is built using a modular, scalable architecture designed to support environmental impact tracking and sustainability goal management. The system follows clean architecture principles with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Web App   │  │ Mobile App  │  │   API       │      │
│  │             │  │             │  │   Clients   │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   CORS      │  │ Rate        │  │ Request     │      │
│  │   Middleware│  │ Limiting    │  │ Validation  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   JWT       │  │ Password    │  │ Session     │      │
│  │   Auth      │  │ Hashing     │  │ Management  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Controllers│  │   Services  │  │   Routes    │      │
│  │             │  │             │  │             │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Domain Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Models    │  │   Types     │  │   Constants │      │
│  │             │  │             │  │             │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Database  │  │   Logging   │  │   Email     │      │
│  │   (Prisma)  │  │  (Winston)  │  │ (SendGrid)  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. API Gateway Layer

**Purpose**: Handles incoming requests, security, and routing

**Components**:
- **CORS Middleware**: Cross-origin resource sharing
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **Request Validation**: Input sanitization and validation
- **Error Handling**: Centralized error management

### 2. Authentication Layer

**Purpose**: Manages user authentication and authorization

**Components**:
- **JWT Authentication**: Stateless token-based auth
- **Password Hashing**: Secure password storage with bcrypt
- **Session Management**: User session handling
- **Authorization**: Role-based access control

### 3. Application Layer

**Purpose**: Contains business logic and request handling

**Components**:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic implementation
- **Routes**: URL routing and endpoint definitions
- **Middleware**: Request processing and transformation

### 4. Domain Layer

**Purpose**: Core business entities and rules

**Components**:
- **Models**: Data structures and relationships
- **Types**: TypeScript type definitions
- **Constants**: Application constants and enums
- **Validation**: Business rule validation

### 5. Infrastructure Layer

**Purpose**: External services and data persistence

**Components**:
- **Database**: PostgreSQL with Prisma ORM
- **Logging**: Winston logger with file rotation
- **Email**: SendGrid integration
- **File Storage**: Media file management

## Module Architecture

### Feature-Based Modules

Each feature is organized as a self-contained module:

```
src/modules/auth/
├── auth.controller.ts    # Request handling
├── auth.service.ts       # Business logic
├── auth.routes.ts        # Route definitions
├── auth.middleware.ts    # Auth-specific middleware
├── auth.types.ts         # Type definitions
├── auth.validation.ts    # Input validation
└── auth.utils.ts         # Utility functions
```

### Shared Resources

Common functionality is shared across modules:

```
src/shared/
├── middleware/           # Express middleware
├── utils/               # Utility functions
├── types/               # Common types
├── constants/           # Application constants
├── errors/              # Error handling
└── services/            # Shared services
```

## Data Flow

### Request Processing

1. **Client Request** → API Gateway Layer
2. **Authentication** → Verify JWT token
3. **Validation** → Validate request data
4. **Controller** → Handle HTTP request
5. **Service** → Execute business logic
6. **Database** → Persist/retrieve data
7. **Response** → Return formatted response

### Example Flow: Create Activity

```
POST /api/activities
    ↓
Authentication Middleware (JWT)
    ↓
Validation Middleware (Request data)
    ↓
Activities Controller (handle request)
    ↓
Activities Service (business logic)
    ↓
Database (Prisma)
    ↓
Response (JSON)
```

## Security Architecture

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Password Security**: bcrypt hashing with salt
- **Token Expiration**: Configurable token lifetime
- **Refresh Tokens**: Secure token renewal

### Data Protection

- **Input Validation**: Sanitize all user inputs
- **SQL Injection Prevention**: Prisma ORM protection
- **CORS Configuration**: Controlled cross-origin access
- **Rate Limiting**: Prevent abuse and DDoS

### Environment Security

- **Environment Variables**: Secure configuration
- **Secrets Management**: JWT secrets and API keys
- **HTTPS Enforcement**: Production SSL/TLS
- **Logging**: Security event logging

## Scalability Considerations

### Horizontal Scaling

- **Stateless Design**: JWT-based authentication
- **Database Connection Pooling**: Efficient DB connections
- **Caching Strategy**: Redis for session/data caching
- **Load Balancing**: Multiple server instances

### Performance Optimization

- **Database Indexing**: Optimized query performance
- **Pagination**: Large dataset handling
- **Compression**: Response compression
- **CDN Integration**: Static asset delivery

## Monitoring & Observability

### Logging Strategy

- **Structured Logging**: Winston with JSON format
- **Log Levels**: Error, Warn, Info, Debug
- **Log Rotation**: Daily file rotation
- **Centralized Logging**: Production log aggregation

### Health Checks

- **Database Connectivity**: Connection health
- **External Services**: Email, storage health
- **Application Metrics**: Response times, error rates
- **System Resources**: Memory, CPU usage

## Deployment Architecture

### Development Environment

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │   Backend   │    │  Database   │
│   (Port 3000)│   │   (Port 3001)│   │  (Port 5432)│
└─────────────┘    └─────────────┘    └─────────────┘
```

### Production Environment

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Load      │    │   Backend   │    │  Database   │
│   Balancer  │◄──►│   Cluster   │◄──►│   Cluster   │
└─────────────┘    └─────────────┘    └─────────────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   CDN       │    │   Cache     │    │   Backup    │
│   (Static)  │    │   (Redis)   │    │   (S3)      │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Technology Stack

### Backend Framework
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Type-safe development

### Database & ORM
- **PostgreSQL**: Primary database
- **Prisma**: Type-safe ORM
- **Redis**: Caching (optional)

### Authentication
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin handling

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Docker**: Containerization

## Future Enhancements

### Planned Features
- **Microservices Architecture**: Service decomposition
- **Event-Driven Architecture**: Message queues
- **GraphQL API**: Flexible data querying
- **Real-time Features**: WebSocket integration
- **Machine Learning**: Carbon footprint predictions

### Scalability Improvements
- **Database Sharding**: Horizontal scaling
- **Caching Strategy**: Multi-level caching
- **API Versioning**: Backward compatibility
- **Monitoring**: Advanced observability 