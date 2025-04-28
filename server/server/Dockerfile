# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
COPY src/prisma ./prisma
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/copy.js ./copy.js
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=4000
ENV AWS_REGION=us-east-1
ENV CLIENT_SERVER=https://www.kohminds.com
ENV CLIENT_SERVER_2=https://admin.kohminds.com
ENV COOKIE_CLIENT=.kohminds.com

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]