# GREEN FOOTPRINT BACKEND

## 🌱 Overview

Green Footprint is a sustainability-focused application that helps users track their environmental impact through various activities like transportation, energy consumption, and daily habits. This backend provides robust APIs for user management, activity tracking, and carbon footprint calculations.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Framework**: Express.js
- **Authentication**: JWT

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd green-footprint-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/green_footprint_db?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important**: Replace `USER`, `PASSWORD`, and `your-super-secret-jwt-key` with your actual values.

### 4. Database Setup

Set up your Prisma schema and database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Build and Run

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
# Compile TypeScript
npx tsc

# Run the compiled JavaScript
node dist/server.js
```

If successful, you'll see:

```
Express is listening at http://localhost:3000
```

## 📊 Database Schema

### Example Models

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  password     String
  firstName    String?
  lastName     String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  // Relations
  activities   Activity[]
  goals        Goal[]

  @@map("users")
}

model Activity {
  id          Int      @id @default(autoincrement())
  userId      Int
  type        ActivityType
  description String?
  carbonValue Float    // CO2 equivalent in kg
  date        DateTime @default(now())
  createdAt   DateTime @default(now())

  // Relations
  user        User     @relation(fields: [userId], references: [id])

  @@map("activities")
}

model Goal {
  id          Int      @id @default(autoincrement())
  userId      Int
  targetValue Float    // Target CO2 reduction in kg
  currentValue Float   @default(0)
  deadline    DateTime
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  // Relations
  user        User     @relation(fields: [userId], references: [id])

  @@map("goals")
}

enum ActivityType {
  TRANSPORTATION
  ENERGY
  FOOD
  WASTE
  WATER
  OTHER
}
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Activities

- `GET /api/activities` - Get user activities (protected)
- `POST /api/activities` - Create new activity (protected)
- `PUT /api/activities/:id` - Update activity (protected)
- `DELETE /api/activities/:id` - Delete activity (protected)

### Goals

- `GET /api/goals` - Get user goals (protected)
- `POST /api/goals` - Create new goal (protected)
- `PUT /api/goals/:id` - Update goal (protected)

### Analytics

- `GET /api/analytics/carbon-footprint` - Get carbon footprint summary (protected)
- `GET /api/analytics/trends` - Get environmental impact trends (protected)

## 🔧 Development Scripts

```json
{
  "scripts": {
    "dev": "ts-node-dev src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push",
    "prisma:studio": "prisma studio"
  }
}
```

## 🌍 Environmental Impact Features

- **Carbon Footprint Tracking**: Monitor CO2 emissions from various activities
- **Activity Categories**: Transportation, energy, food, waste, and water usage
- **Goal Setting**: Set and track environmental improvement targets
- **Progress Analytics**: Visualize environmental impact over time
- **Sustainability Insights**: Get personalized recommendations

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **JunCodera1**: [GitHub Profile](https://github.com/JunCodera1)
- **Minhwritecode**: [GitHub Profile](https://github.com/Minhwritecode)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Made with 🌱 for a sustainable future**
