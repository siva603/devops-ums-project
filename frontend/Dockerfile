# Stage 1: Build - node:20-slim (Debian based, no musl issues)
FROM node:20-slim AS builder

WORKDIR /app

# Copy package.json only
COPY package.json ./

# Clean install
RUN npm install

# Copy all source files
COPY . .

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
