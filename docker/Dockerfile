# syntax=docker/dockerfile:1

FROM node:22.13.1-alpine AS build

ENV CI=true
WORKDIR /resources-api

RUN apk add --no-cache bash git openssh-client openssl \
  && npm install --global pnpm@10.33.2

# Install from the lockfile before copying the rest of the application. The
# package postinstall hook generates the three Prisma 7 service clients
# without connecting to a database. The committed external client is copied
# later with the rest of the source tree and is not regenerated.
COPY package.json pnpm-lock.yaml prisma.config.ts tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

COPY . .
RUN mkdir -p src/scripts/seed \
  && pnpm lint \
  && pnpm build \
  && pnpm prune --prod

FROM node:22.13.1-alpine AS production

ENV NODE_ENV=production
WORKDIR /resources-api

RUN apk add --no-cache bash openssl \
  && npm install --global pnpm@10.33.2

COPY --from=build --chown=node:node /resources-api/dist ./dist
COPY --from=build --chown=node:node /resources-api/node_modules ./node_modules
COPY --from=build --chown=node:node /resources-api/package.json ./package.json
COPY --from=build --chown=node:node /resources-api/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build --chown=node:node /resources-api/config ./config
COPY --from=build --chown=node:node /resources-api/prisma.config.ts ./prisma.config.ts
COPY --from=build --chown=node:node /resources-api/prisma ./prisma
COPY --from=build --chown=node:node /resources-api/docs ./docs
COPY --from=build --chown=node:node /resources-api/packages/resources-prisma-client ./packages/resources-prisma-client
COPY --from=build --chown=node:node /resources-api/src/generated ./src/generated
COPY --from=build --chown=node:node /resources-api/src/scripts/seed ./src/scripts/seed
COPY --from=build --chown=node:node --chmod=755 /resources-api/appStartUp.sh ./appStartUp.sh

USER node
EXPOSE 3000

CMD ["./appStartUp.sh"]
