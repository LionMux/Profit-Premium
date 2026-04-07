# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma files
COPY prisma ./prisma
RUN npx prisma generate

# Copy built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Create uploads directory
RUN mkdir -p /app/public/uploads

EXPOSE 3000

CMD ["npm", "start"]
