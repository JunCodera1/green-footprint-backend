# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the server port
EXPOSE 3000

# Run the dev server
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]
