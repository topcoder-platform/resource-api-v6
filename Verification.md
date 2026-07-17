# Resource API v6 verification

Use this checklist to verify the TypeScript, NestJS, Prisma 7, and Node 22 conversion without changing the service's external behavior.

## Static verification

From the project directory:

```bash
nvm use
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm test
```

The generated application entrypoint must be `dist/main.js`. Dependency installation must generate the resources, member, and challenge Prisma 7 clients. It must not regenerate or alter the committed Prisma 6-compatible `packages/resources-prisma-client` artifact.

## Database verification

Configure the existing `DATABASE_URL`, `MEMBER_DB_URL`, and `CHALLENGE_DB_URL` values. Check migration state with:

```bash
pnpm exec prisma migrate status
```

Start the production container or run `pnpm exec prisma migrate deploy` and confirm that Prisma reports the checked-in migration history as applied or applies only genuinely pending migrations.

Verification must not use `prisma migrate dev`, `prisma db push`, a database reset, or modified migration SQL. Compare `git diff -- prisma/migrations` and confirm there are no migration changes from this conversion.

## Runtime smoke test

Build the same image used by CircleCI:

```bash
./build.sh resources-api-v6
```

Run it with the existing deployment variables and confirm the logs show migration deployment before `resource-api-v6` starts. The container must run on Node 22.13.1, start `dist/main.js`, and answer:

```text
GET /v6/resources/health
GET /v6/resources/api-docs
```

Also confirm pagination headers, error status codes and bodies, authentication behavior, and the documented v6 route casing remain unchanged.

## API regression verification

Run the unit and Postman suites, then exercise at least these successful flows:

- List, create, and delete a resource.
- List, create, and update a resource role.
- List, create, update, and delete a resource-role phase dependency.
- List challenges for a member.
- Update a resource's phase-change notification preference.
- Create a submitter resource with registration email enabled and disabled.

Compare response bodies, pagination metadata, validation messages, authorization failures, and side effects with the pre-conversion API.

## Bus API event verification

The service has no Kafka consumer. It publishes through Bus API and therefore must not require Kafka brokers or `@platformatic/kafka` configuration.

For successful create, update, and delete operations, confirm Bus API receives the configured topics:

- `challenge.action.resource.create`
- `challenge.action.resource.delete`
- `challenge.action.resource.role.create`
- `challenge.action.resource.role.update`
- `external.action.email` when a registration email is required

Each event must retain the existing envelope fields: `topic`, `originator`, ISO `timestamp`, `'mime-type': 'application/json'`, and `payload`. Error reporting must continue to use `KAFKA_ERROR_TOPIC` through the same Bus API publisher.

Publishing is intentionally awaited. Verify that a Bus API publishing failure still fails the calling operation in the same way as before the conversion.

In development, published topics can be inspected with the existing event-observation tooling. Unit tests and the challenge mock continue to emulate `POST /v5/bus/events`.

## Configuration verification

Deploy without renaming or adding parameter-store keys. In particular, confirm the service reads the existing Auth0, scope, downstream API, role ID, Bus API, topic, email, database, and Prisma timeout variables documented in `ReadMe.md`.

Keep the legacy `EMAIL_NOTIFICATIN_TOPIC` spelling and the existing `KAFKA_*` names. No direct Kafka connection parameters should be required.

## CircleCI verification

On the `typescript` branch, confirm that:

- The development workflow builds the nested `docker/Dockerfile` with BuildKit.
- The Docker build completes frozen pnpm installation, Prisma generation, lint, and Nest compilation.
- Deployment still uses `APPNAME=resources-api-v6` and the existing DEV/PROD parameter-store paths.
- Dependency setup removes the image's preconfigured Chrome and Docker APT sources before updating package indexes; both tools are already installed in that image.
- The Newman job runs on Node 22.13.1 with pnpm 10.33.2 from the repository root.
- The health wait succeeds before the Postman scripts run and Newman artifacts are retained.
