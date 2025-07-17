# 🌱 Green Footprint Backend

> **A sustainable lifestyle tracking API** - Monitor, analyze, and reduce your environmental impact through comprehensive carbon footprint tracking and goal management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Green Footprint Backend is a comprehensive RESTful API designed to help users track their environmental impact and work towards sustainability goals. The system provides:

- **Carbon Footprint Tracking**: Monitor CO2 emissions from daily activities
- **Goal Management**: Set and track environmental improvement targets
- **Activity Logging**: Record various types of environmental activities
- **Analytics & Insights**: Visualize impact trends and get recommendations
- **User Management**: Secure authentication and profile management

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication** with refresh tokens
- 👤 **User Management** with profiles and preferences
- 📊 **Activity Tracking** across multiple categories
- 🎯 **Goal Setting** with progress monitoring
- 📈 **Analytics Dashboard** with carbon footprint calculations
- 📝 **Blog/Forum Posts** for community engagement
- 🔍 **Activity Verification** system
- 📱 **Multi-language Support** (i18n)

### Activity Categories
- 🚗 **Transportation** (car, bike, public transport)
- ⚡ **Energy** (electricity, heating, cooling)
- 🍽️ **Food** (diet choices, food waste)
- 🗑️ **Waste** (recycling, composting)
- 💧 **Water** (usage, conservation)

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | Node.js | 18+ |
| **Language** | TypeScript | 5.8+ |
| **Framework** | Express.js | 5.1+ |
| **Database** | PostgreSQL | 15+ |
| **ORM** | Prisma | 6.9+ |
| **Authentication** | JWT + bcryptjs | - |
| **Validation** | Joi | 17.13+ |
| **Logging** | Winston | 3.17+ |
| **Email** | SendGrid | - |
| **Development** | ts-node-dev | 2.0+ |

## 🏗️ Architecture

```
src/
├── modules/           # Feature-based modules
│   ├── auth/         # Authentication & authorization
│   ├── users/        # User management
│   ├── activities/   # Activity tracking
│   ├── goals/        # Goal management
│   ├── posts/        # Blog/forum posts
│   └── profiles/     # User profiles
├── shared/           # Shared utilities
│   ├── middleware/   # Express middleware
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript types
│   └── constants/    # Application constants
├── config/           # Configuration files
├── database/         # Database setup & migrations
└── routes/           # Route definitions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** 15+
- **npm** or **yarn**
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd green-footprint-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/green_footprint"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
   JWT_EXPIRES_IN="7d"
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # Email (optional)
   SEND_GRID_API_KEY="your-sendgrid-api-key"
   FROM_EMAIL="your-email@domain.com"
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Seed database
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Server will be available at `http://localhost:3000`

### Docker Setup

```bash
# Using Docker Compose
docker-compose up -d

# Or build manually
docker build -t green-footprint-backend .
docker run -p 3000:3000 green-footprint-backend
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/profile` | Get user profile |
| `POST` | `/api/auth/refresh` | Refresh JWT token |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/profile` | Get user profile |
| `PUT` | `/api/users/profile` | Update user profile |
| `DELETE` | `/api/users/account` | Delete user account |

### Activity Tracking

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/activities` | Get user activities |
| `POST` | `/api/activities` | Create new activity |
| `PUT` | `/api/activities/:id` | Update activity |
| `DELETE` | `/api/activities/:id` | Delete activity |
| `GET` | `/api/activities/:id` | Get specific activity |

### Goal Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/goals` | Get user goals |
| `POST` | `/api/goals` | Create new goal |
| `PUT` | `/api/goals/:id` | Update goal |
| `DELETE` | `/api/goals/:id` | Delete goal |
| `POST` | `/api/goals/:id/progress` | Add progress update |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/carbon-footprint` | Get carbon footprint summary |
| `GET` | `/api/analytics/trends` | Get environmental trends |
| `GET` | `/api/analytics/goals-progress` | Get goals progress |

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
npm run prisma:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Project Structure

```
green-footprint-backend/
├── src/
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── users/        # User management
│   │   ├── activities/   # Activity tracking
│   │   ├── goals/        # Goal management
│   │   ├── posts/        # Blog posts
│   │   └── profiles/     # User profiles
│   ├── shared/           # Shared utilities
│   │   ├── middleware/   # Express middleware
│   │   ├── utils/        # Utility functions
│   │   ├── types/        # TypeScript types
│   │   └── constants/    # App constants
│   ├── config/           # Configuration
│   ├── database/         # Database setup
│   └── routes/           # Route definitions
├── tests/                # Test files
├── docs/                 # Documentation
├── scripts/              # Utility scripts
└── docker/               # Docker files
```

### Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts and authentication
- **Activities**: Environmental activities with carbon values
- **Goals**: User-defined environmental targets
- **Posts**: Blog/forum posts for community
- **Profiles**: Extended user information

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables

Required environment variables for production:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Or build manually
docker build -t green-footprint-backend .
docker run -p 3000:3000 --env-file .env green-footprint-backend
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow the existing code style
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **JunCodera1** - [GitHub](https://github.com/JunCodera1)
- **Minhwritecode** - [GitHub](https://github.com/Minhwritecode)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@greenfootprint.com

---

**Made with 🌱 for a sustainable future**

> *Every small action counts towards a greener tomorrow*
