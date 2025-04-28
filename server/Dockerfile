FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Generate Prisma Client
COPY src/prisma ./prisma
RUN npx prisma generate

# Build the application
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]