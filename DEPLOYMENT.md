# Deployment Guide - KLTMINES Investment Platform

This guide explains how to deploy the frontend and backend modules separately for production.

## 🏗️ Architecture Overview

The platform is now split into two separate modules:
- **Frontend**: Next.js application (Port 3000)
- **Backend**: NestJS API (Port 5000)

## 🚀 Frontend Deployment

### Vercel (Recommended for Frontend)

1. **Connect Repository**
   ```bash
   # Push your frontend code to GitHub
   git add .
   git commit -m "Setup frontend module"
   git push origin main
   ```

2. **Configure Vercel**
   - Connect your GitHub repository to Vercel
   - Set the **Root Directory** to `frontend`
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**
   ```env
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   ```

### Netlify Alternative

1. **Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

2. **Environment Variables**
   ```env
   NEXTAUTH_URL=https://your-site.netlify.app
   NEXTAUTH_SECRET=your-secret-key
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   ```

### Docker Deployment

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.* ./

RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Backend Deployment

### Railway/Render (Recommended for Backend)

1. **Connect Repository**
   - Connect your GitHub repository
   - Set the **Root Directory** to `backend`
   - Build Command: `npm run build`
   - Start Command: `npm run start:prod`

2. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb://your-mongo-connection
   REDIS_URL=redis://your-redis-connection
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET_KEY=your-stripe-key
   PAYSTACK_SECRET_KEY=your-paystack-key
   FLUTTERWAVE_SECRET_KEY=your-flutterwave-key
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email
   SMTP_PASS=your-password
   ```

### Heroku Deployment

1. **Create Heroku App**
   ```bash
   heroku create your-app-name-backend
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=mongodb://...
   # Add all environment variables
   ```

2. **Deploy**
   ```bash
   # From backend directory
   git init
   git add .
   git commit -m "Initial backend deployment"
   heroku git:remote -a your-app-name-backend
   git push heroku main
   ```

### VPS/DigitalOcean Deployment

1. **Setup Server**
   ```bash
   # Install Node.js, PM2, MongoDB, Redis
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-repo.git
   cd your-repo/backend
   
   # Install dependencies
   npm install --production
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

3. **PM2 Configuration** (`backend/ecosystem.config.js`)
   ```javascript
   module.exports = {
     apps: [{
       name: 'kltmines-backend',
       script: 'dist/src/main.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 5000
       }
     }]
   };
   ```

### Docker Deployment

```dockerfile
# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production

EXPOSE 5000
CMD ["npm", "run", "start:prod"]
```

## 🐳 Docker Compose (Full Stack)

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/kltmines
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

## 🌐 Domain Configuration

### Frontend Domain
- Point your domain (e.g., `app.kltmines.com`) to your frontend deployment
- Configure SSL/TLS certificates

### Backend API Domain
- Point your API subdomain (e.g., `api.kltmines.com`) to your backend deployment
- Update frontend environment variable: `NEXT_PUBLIC_API_URL=https://api.kltmines.com`

## 📊 Monitoring & Logging

### Backend Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs kltmines-backend

# Restart application
pm2 restart kltmines-backend
```

### Health Checks
- Frontend: `https://your-domain.com/api/health`
- Backend: `https://api.your-domain.com/health`

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure secret management services
   - Rotate keys regularly

2. **CORS Configuration**
   ```typescript
   // backend/src/main.ts
   app.enableCors({
     origin: ['https://your-frontend-domain.com'],
     credentials: true
   });
   ```

3. **Rate Limiting**
   - Configure appropriate rate limits
   - Use Redis for distributed rate limiting

4. **SSL/TLS**
   - Always use HTTPS in production
   - Configure proper security headers

## 📈 Scaling Considerations

### Frontend Scaling
- Use CDN for static assets
- Enable Next.js Image Optimization
- Consider Edge Functions for API routes

### Backend Scaling
- Use load balancers
- Scale horizontally with multiple instances
- Use database connection pooling
- Implement caching strategies

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   npm run clean
   npm install
   npm run build
   ```

2. **Database Connection Issues**
   - Check MongoDB URI and network access
   - Verify IP whitelist for cloud databases

3. **CORS Errors**
   - Update CORS origins in backend
   - Check API URL in frontend environment

4. **Port Conflicts**
   - Frontend: 3000 (configurable)
   - Backend: 5000 (configurable via PORT env var)

## 📞 Support

For deployment issues:
- Check logs first
- Verify environment variables
- Test API endpoints individually
- Contact support@kltmines.com for assistance 