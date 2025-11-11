# Multi-stage Dockerfile for Vite frontend + Node backend
FROM node:18-alpine AS builder
WORKDIR /app

# Install build deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy everything and build frontend
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# Install production deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend and server files
COPY --from=builder /app/dist ./dist
COPY server ./server
COPY components ./components
COPY utils ./utils
COPY data ./data
COPY index.html .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Default command: start both services (production + realtime)
CMD ["node", "server/start-all.js"]
