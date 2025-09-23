# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["pnpm", "dev"]
