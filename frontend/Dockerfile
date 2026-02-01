# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

# Install a simple static server
RUN npm install -g serve

EXPOSE 5173

CMD [ "serve", "-s", "dist", "-l", "5173" ]
