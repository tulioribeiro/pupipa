FROM node:lts AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:lts
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
