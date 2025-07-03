# Simple Dockerfile for full-stack deployment
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files and pnpm-lock.yaml
COPY package*.json pnpm-lock.yaml ./
COPY backend/package*.json ./backend/

# Install all dependencies from root (this will install backend deps too)
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build both frontend and backend
RUN pnpm run build:frontend
RUN pnpm run build:backend

# Expose both ports
EXPOSE 3000 3001

# Start both services in production
CMD ["pnpm", "run", "start:production"] 