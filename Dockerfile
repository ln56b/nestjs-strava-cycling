FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i
COPY . ./

RUN npm run build



FROM node:22-alpine AS development
ENV NODE_ENV=development
WORKDIR /app

COPY --from=base /app /app

CMD ["npm", "run", "start:debug"]



FROM node:22-alpine3.21 AS production
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=base /app/dist ./dist


CMD ["node", "dist/main"]


