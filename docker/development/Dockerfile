FROM node:24-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=development

EXPOSE 3000

ENV PORT=3000

CMD ["pnpm", "dev"]
