# Multi-stage Dockerfile for Railway deployment
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci --only=production

# Build backend
FROM base AS backend-builder
WORKDIR /app
COPY backend/ ./backend/
COPY --from=deps /app/backend/node_modules ./backend/node_modules
WORKDIR /app/backend
RUN npm run build

# Build frontend
FROM base AS frontend-builder
WORKDIR /app
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build frontend
RUN npm run build:frontend

# Production image for backend
FROM base AS backend-runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package*.json ./

EXPOSE 3001

CMD ["npm", "run", "start:prod"]

# Production image for frontend
FROM base AS frontend-runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built frontend
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/package*.json ./
COPY --from=frontend-builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"] 