# syntax=docker/dockerfile:1

# ----------- Base Stage -------------
FROM node:24-alpine AS base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
# ----------- Dependencies Stage -------------
FROM base AS deps

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

RUN --mount=type=cache,target=/pnpm/store \
  pnpm install --frozen-lockfile
# ----------- Builder Stage -------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/pnpm/store \
  --mount=type=cache,target=/app/.next/cache \
  pnpm build
# ----------- Runner Stage -------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup -S staff001 && adduser -S staff001 -G staff001

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN chown -R staff001:staff001 /app

USER staff001

EXPOSE 3000

CMD ["node", "server.js"]

