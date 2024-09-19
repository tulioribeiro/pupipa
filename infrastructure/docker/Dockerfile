FROM node:20.17.0 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:20.17.0-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
