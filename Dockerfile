# Multi-stage build para producción

# Stage 1: Build del frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Stage 2: Backend y producción
FROM node:18-alpine
WORKDIR /app

# Instalar dependencias del backend
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Copiar código del backend
WORKDIR /app
COPY server/ ./server/

# Copiar frontend construido
COPY --from=frontend-builder /app/client/.next ./client/.next
COPY --from=frontend-builder /app/client/public ./client/public
COPY --from=frontend-builder /app/client/package*.json ./client/
COPY --from=frontend-builder /app/client/next.config.js ./client/
COPY --from=frontend-builder /app/client/node_modules ./client/node_modules

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Cambiar permisos
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 5000 3000

# Script de inicio
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

