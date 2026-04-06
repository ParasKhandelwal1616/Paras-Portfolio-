# Dockerfile in /media/paras/New Volume/New folder/my final portfolio/portfolio/Dockerfile

# Step 1: Base image
FROM node:20-alpine AS base

# Step 2: Install dependencies
# We use Alpine-based images, so libc6-compat is needed for some native dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency files first for layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Step 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the build command
RUN npm run build

# Step 4: Runner - Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Security: Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets and necessary build outputs
COPY --from=builder /app/public ./public

# Use the standalone output (requires output: 'standalone' in next.config.ts)
# This includes all necessary files for production in a single 'server.js' file
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using server.js from the standalone build
CMD ["node", "server.js"]
