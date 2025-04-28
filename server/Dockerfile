FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Install OpenSSL 1.1 compatibility package
RUN apk add --no-cache openssl1.1-compat

COPY . .

# Generate Prisma Client
COPY src/prisma ./prisma
RUN npx prisma generate

# Build the application
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]