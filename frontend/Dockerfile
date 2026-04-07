FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# Copy build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx template ← .template extension important
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Default values
ENV BACKEND_HOST=localhost
ENV BACKEND_PORT=8080

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]