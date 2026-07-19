# Topcoder Challenge Resources API v6

This service manages challenge resources, resource roles, and resource-role phase dependencies while preserving the existing v6 HTTP and event contracts.

## Technology

- TypeScript 5 and NestJS 11
- Prisma 7 with PostgreSQL driver adapters
- Node.js 22.13.1
- pnpm 10.33.2
- PostgreSQL for the resources, member, and challenge data sources

The exact local Node version is recorded in `.nvmrc`. Run `nvm use` after entering this project directory and before running pnpm or Node commands.

## Prerequisites

- Node.js 22.13.1 through nvm
- pnpm 10.33.2
- PostgreSQL databases accessible through the existing database URLs
- Docker with BuildKit when building the production image

## Installation and commands

```bash
nvm use
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm test
```

`pnpm install` runs the `postinstall` hook and generates the service's resources, member, and challenge Prisma 7 clients. `pnpm prisma:generate` intentionally generates only those three service clients. The committed `packages/resources-prisma-client` directory remains the existing Prisma 6-compatible external artifact used by sibling services; it is not regenerated as part of this rollout.

Useful commands are:

- `pnpm start` starts the compiled application from `dist/main.js`.
- `pnpm start:dev` starts Nest in watch mode.
- `pnpm build` compiles the TypeScript application.
- `pnpm lint` checks TypeScript source and tests.
- `pnpm prisma:generate` regenerates the three internal clients.
- `pnpm exec prisma migrate deploy` applies the existing resources migration history.
- `pnpm seed-tables` seeds resource tables.
- `pnpm view-data <ModelName>` displays resource data.
- `pnpm run mock-challenge-api` starts the challenge mock on port 4000.
- `pnpm run mock-api` starts the local API mock on port 4001.
- `pnpm run test:newman` runs the Postman regression suite.
- `pnpm run test:newman:clear` removes Postman test data.

The API listens on port 3000 by default. Swagger UI is available at `/v6/resources/api-docs`, and the source definition is `docs/swagger.yaml`.

## Configuration compatibility

The TypeScript conversion retains the existing environment-variable names and defaults. No deployment parameter rename is required.

### Application and authentication

- `LOG_LEVEL`, `PORT`, `API_VERSION`, `DEFAULT_PAGE_SIZE`, and `API_BASE_URL`
- `AUTH_SECRET` and `VALID_ISSUERS`
- `AUTH0_URL`, `AUTH0_AUDIENCE`, `TOKEN_CACHE_TIME`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and `AUTH0_PROXY_SERVER_URL`
- `SCOPE_READ`, `SCOPE_CREATE`, `SCOPE_DELETE`, `SCOPE_UPDATE`, and `SCOPE_ALL`
- `SUBMITTER_RESOURCE_ROLE_ID`, `REVIEWER_RESOURCE_ROLE_ID`, and `ITERATIVE_REVIEWER_RESOURCE_ROLE_ID`

Defaults remain port `3000`, API version `v6`, and page size `1000`.

### Databases

- `DATABASE_URL` connects to the resources database and is used by `prisma migrate deploy`.
- `MEMBER_DB_URL` connects the read-only member client.
- `CHALLENGE_DB_URL` connects the challenge client used for challenge lookups and registrant-count updates.
- `RESOURCE_SERVICE_PRISMA_TIMEOUT` retains the existing Prisma timeout setting.

All three URLs are required for application behavior that touches their corresponding data source. They remain separate parameters; this upgrade does not introduce replacement URL names.

### Downstream APIs

- `TERMS_API_URL`
- `MEMBER_API_URL`
- `USER_API_URL`
- `CHALLENGE_API_URL`
- `CHALLENGE_PHASES_API_URL`
- `SUBMISSIONS_API_URL`
- `GROUPS_API_URL`

### Bus API and event topics

This service publishes events through the existing Bus API HTTP client. It does not consume Kafka messages, so it does not use `@platformatic/kafka` and requires no Kafka broker configuration.

The retained publishing parameters are:

- `BUSAPI_URL`
- `KAFKA_ERROR_TOPIC`
- `KAFKA_MESSAGE_ORIGINATOR`
- `RESOURCE_CREATE_TOPIC`
- `RESOURCE_DELETE_TOPIC`
- `RESOURCE_ROLE_CREATE_TOPIC`
- `RESOURCE_ROLE_UPDATE_TOPIC`
- `EMAIL_NOTIFICATIN_TOPIC`

`EMAIL_NOTIFICATIN_TOPIC` intentionally retains its existing spelling for deployment compatibility. The `KAFKA_*` parameter names are also retained even though this service reaches Kafka indirectly through Bus API.

Registration email payloads continue to use `EMAIL_FROM`, `SENDGRID_TEMPLATE_ID`, `SENDGRID_TEMPLATE_ID_NO_FORUM`, `SUBMIT_URL`, `REVIEW_APP_URL`, `HELP_URL`, and `SUPPORT_EMAIL`. `TOPCROWD_CHALLENGE_TEMPLATE_ID` continues to control whether the registration email event is emitted.

Publishing remains synchronous. A command that emits an event waits for Bus API to accept it, preserving the existing endpoint success and failure behavior.

### Automated-test settings

The existing test-only settings remain supported: `WAIT_TIME`, `MOCK_CHALLENGE_API_PORT`, `MOCK_API_PORT`, `AUTH_V2_URL`, `AUTH_V2_CLIENT_ID`, `AUTH_V3_URL`, the admin/copilot/user credential variables, `AUTOMATED_TESTING_REPORTERS_FORMAT`, and `AUTOMATED_TESTING_NAME_PREFIX`.

## Local database setup

Start or connect to the three existing PostgreSQL databases, then export their URLs without changing the variable names:

```bash
export DATABASE_URL="postgresql://user:password@localhost:5532/resourceapi?schema=resources"
export MEMBER_DB_URL="postgresql://user:password@localhost:5632/memberdb"
export CHALLENGE_DB_URL="postgresql://user:password@localhost:5732/challengedb"
```

Apply the checked-in resources migrations and build the application:

```bash
pnpm exec prisma migrate deploy
pnpm build
pnpm start
```

## Prisma migration policy

This upgrade is designed for existing databases. The SQL files and migration lock under `prisma/migrations` are the deployment history and must remain unchanged. Do not reset the database, run `prisma migrate dev`, generate a new migration for this conversion, or use `prisma db push` against a deployed environment.

The production entrypoint runs `pnpm exec prisma migrate deploy` before starting `dist/main.js`. This applies only pending migrations from the unchanged history and does not recreate the schema.

## Docker

Build the Node 22 production image with:

```bash
./build.sh resources-api-v6
```

The multi-stage build performs a frozen pnpm install, Prisma generation through `postinstall`, lint, and TypeScript compilation. The runtime image contains the compiled application, production dependencies, Prisma CLI and configuration, unchanged migrations, Swagger documentation, the three generated internal clients, and the committed external client. It runs as the non-root `node` user.

Runtime configuration continues to be injected through the existing environment variables. The default configuration is included in the image; local `env.sh` files remain excluded.

## Testing

Unit tests require the configured resources, member, and challenge databases as exercised by the relevant test cases:

```bash
nvm use
pnpm test
```

For the Postman suite, build and start the service and challenge mock, then run:

```bash
pnpm run test:newman:clear
pnpm run test:newman
pnpm run test:newman:clear
```

CircleCI performs the Docker build and deployment using the existing `APPNAME`, `DEPLOY_ENV`, and parameter-store paths. The automated-test workflow uses Node 22.13.1, pnpm 10.33.2, and the same deployment environment names.

See `Verification.md` for the regression checklist.
