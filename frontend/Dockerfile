# Stage 1: Build - node:20-slim (Debian based, no musl issues)
FROM node:20-slim AS builder

WORKDIR /app

# Copy package.json only
COPY package.json ./

# Clean install
RUN npm install

# Copy all source files
COPY . .

# ✅ Declare and set build args before build
ARG VITE_API_BASE_URL
ARG VITE_USE_API
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_USE_API=$VITE_USE_API

# Build the Vite app
RUN npm run build

# Stage 2: Serve with Nginx (small image)
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]