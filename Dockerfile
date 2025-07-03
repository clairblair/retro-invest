# Simple Dockerfile for full-stack deployment
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files and install frontend dependencies
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy backend package files and install backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN pnpm install --frozen-lockfile

# Return to root and copy all source code
WORKDIR /app
COPY . .

# Build both frontend and backend
RUN pnpm run build:frontend
WORKDIR /app/backend
RUN pnpm run build

# Back to root for startup
WORKDIR /app

# Expose both ports
EXPOSE 3000 3001

# Start both services in production
CMD ["pnpm", "run", "start:production"] 