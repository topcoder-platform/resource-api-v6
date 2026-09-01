# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.5.1

FROM node:${NODE_VERSION}-alpine AS build

ARG PNPM_VERSION=11.15.1

ENV CI=true
WORKDIR /resources-api

RUN apk upgrade --no-cache \
  && apk add --no-cache bash git openssh-client openssl \
  && npm install --global "pnpm@${PNPM_VERSION}" \
  && npm cache clean --force

# Install from the lockfile before copying the rest of the application. The
# package postinstall hook generates the three Prisma 7 service clients
# without connecting to a database. The committed external client is copied
# later with the rest of the source tree and is not regenerated.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

COPY . .
RUN mkdir -p src/scripts/seed \
  && pnpm lint \
  && pnpm test:logger \
  && pnpm build \
  && pnpm prune --prod

FROM alpine:3.24 AS production

ARG NODE_VERSION

ENV NODE_ENV=production
WORKDIR /resources-api

RUN apk upgrade --no-cache \
  && apk add --no-cache bash "nodejs-current=${NODE_VERSION}-r0" \
  && addgroup -S -g 10001 app \
  && adduser -S -D -H -u 10001 -G app app

COPY --from=build --chown=app:app /resources-api/dist ./dist
COPY --from=build --chown=app:app /resources-api/node_modules ./node_modules
COPY --from=build --chown=app:app /resources-api/package.json ./package.json
COPY --from=build --chown=app:app /resources-api/config ./config
COPY --from=build --chown=app:app /resources-api/prisma.config.ts ./prisma.config.ts
COPY --from=build --chown=app:app /resources-api/prisma ./prisma
COPY --from=build --chown=app:app /resources-api/docs ./docs
COPY --from=build --chown=app:app /resources-api/packages/resources-prisma-client ./packages/resources-prisma-client
COPY --from=build --chown=app:app /resources-api/src/generated ./src/generated
COPY --from=build --chown=app:app /resources-api/src/scripts/seed ./src/scripts/seed
COPY --from=build --chown=app:app --chmod=755 /resources-api/appStartUp.sh ./appStartUp.sh

USER app
EXPOSE 3000

CMD ["./appStartUp.sh"]
