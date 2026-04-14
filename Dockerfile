# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN node ace build

# ---- Production stage ----
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=builder /app/build ./
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps
EXPOSE 3333
CMD ["node", "bin/server.js"]
