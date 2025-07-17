# Installation Guide

## Prerequisites

Before installing Green Footprint Backend, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher)
  ```bash
  # Check Node.js version
  node --version
  ```
  
- **npm** or **yarn**
  ```bash
  # Check npm version
  npm --version
  ```

- **PostgreSQL** (v15 or higher)
  ```bash
  # Check PostgreSQL version
  psql --version
  ```

- **Git**
  ```bash
  # Check Git version
  git --version
  ```

### Optional Software

- **Docker** (for containerized development)
- **Docker Compose** (for multi-container setup)
- **Redis** (for caching, if needed)

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/green-footprint-backend.git

# Navigate to the project directory
cd green-footprint-backend
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit the environment file
nano .env
```

Configure the following variables in your `.env` file:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/green_footprint"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration (Optional)
SEND_GRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="your-email@domain.com"

# Logging Configuration
LOG_LEVEL=info
```

### 4. Database Setup

#### Option A: Local PostgreSQL

1. **Create Database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE green_footprint;
   
   # Create user (optional)
   CREATE USER green_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE green_footprint TO green_user;
   ```

2. **Run Prisma Migrations**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

#### Option B: Docker PostgreSQL

```bash
# Start PostgreSQL with Docker
docker run --name green-postgres \
  -e POSTGRES_DB=green_footprint \
  -e POSTGRES_USER=green_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

### 5. Verify Installation

```bash
# Start the development server
npm run dev

# The server should start on http://localhost:3000
```

### 6. Test the Installation

```bash
# Test the API
curl http://localhost:3000/

# Expected response: "Hello World!"
```

## Docker Installation

### Using Docker Compose

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/your-username/green-footprint-backend.git
   cd green-footprint-backend
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Services**
   ```bash
   docker-compose up -d
   ```

4. **Verify Installation**
   ```bash
   # Check running containers
   docker-compose ps
   
   # View logs
   docker-compose logs backend
   ```

### Manual Docker Build

```bash
# Build the image
docker build -t green-footprint-backend .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e JWT_SECRET="your-secret" \
  green-footprint-backend
```

## Development Setup

### 1. Install Development Dependencies

```bash
# Install TypeScript globally (optional)
npm install -g typescript

# Install development tools
npm install -g nodemon ts-node
```

### 2. Configure IDE

#### VS Code Extensions
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Prisma (for database schema)

#### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### 3. Database Management

```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Error
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if not running
sudo systemctl start postgresql
```

#### 2. Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### 3. Permission Denied
```bash
# Fix npm permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

#### 4. Prisma Client Generation Error
```bash
# Clear Prisma cache
npx prisma generate --force

# Reset node_modules
rm -rf node_modules
npm install
```

### Environment-Specific Setup

#### Ubuntu/Debian
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### macOS
```bash
# Install PostgreSQL with Homebrew
brew install postgresql

# Start PostgreSQL
brew services start postgresql
```

#### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Add PostgreSQL bin directory to PATH

## Next Steps

After successful installation:

1. **Read the API Documentation** - Check `docs/api/` for endpoint details
2. **Set up your IDE** - Configure your development environment
3. **Create your first user** - Test the registration endpoint
4. **Explore the codebase** - Understand the project structure
5. **Run tests** - Ensure everything is working correctly

## Support

If you encounter issues during installation:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [GitHub Issues](https://github.com/your-repo/issues)
3. Create a new issue with detailed error information
4. Contact the maintainers for assistance 