# Co-authored-by: whokingworld <whokingworld@gmail.com> (bd0f252)
FROM node:22-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

EXPOSE 8080
CMD ["node", "src/index.js"]

