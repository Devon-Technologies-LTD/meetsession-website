# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN npm install -g pnpm
RUN pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm

ARG NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_ENABLE_PAYSTACK

ENV NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=$NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_ENABLE_PAYSTACK=$NEXT_PUBLIC_ENABLE_PAYSTACK

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S staff001
RUN adduser -S staff001 -u 1001

COPY --from=builder /app/public ./public
COPY ./src/app/favicon.ico ./public

COPY --from=builder --chown=staff001:staff001 /app/.next/standalone ./
COPY --from=builder --chown=staff001:staff001 /app/.next/static ./.next/static

USER staff001

EXPOSE 3000
ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js
