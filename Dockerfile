# Development stage
FROM node:20-alpine3.19 AS development
WORKDIR /app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
COPY . ./
RUN npm run build



# Build stage (for production)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# Production stage
FROM node:20-alpine3.19 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist


CMD ["node", "dist/main"]


