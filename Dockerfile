FROM node:20-alpine3.19 AS development

WORKDIR /var/www

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
COPY . ./
RUN npm run build



FROM node:20-alpine3.19 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /var/www

COPY --from=development /var/www .


CMD ["node", "dist/main"]
