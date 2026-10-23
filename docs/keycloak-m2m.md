# Keycloak M2M migration branch

This code is isolated on `keycloak_m2M`. Do not deploy this branch until the
workload and its callers are ready. Existing DEV services continue using Auth0.
The core dependency is pinned to a reviewed Keycloak prerelease commit, including
transitive wrapper uses through the pnpm override. No npm latest dependency is used.
`pnpm-lock.yaml` resolves a single 4.0.0-keycloak.1 (core commit `e844764`), including
the copy used by `tc-bus-api-wrapper`.

## Provider switch: `USE_KEYCLOAK`

`USE_KEYCLOAK=true` makes this service get its M2M tokens from Keycloak, using
`KEYCLOAK_TOKEN_URL`, `KEYCLOAK_AUDIENCE`, `KEYCLOAK_CLIENT_ID` and
`KEYCLOAK_CLIENT_SECRET` (optional `KEYCLOAK_SCOPE` narrows the client's defaults).
`KEYCLOAK_ISSUER` is also required. Unset or `false` restores the Auth0 behaviour from
before the migration:

- Outbound API calls (`helper.getRequest`/`postRequest`) and the Postman runner use
  `AUTH0_URL` (default `https://topcoder-dev.auth0.com/oauth/token`), `AUTH0_AUDIENCE`
  (default `https://m2m.topcoder-dev.com/`), `AUTH0_PROXY_SERVER_URL` (default
  `AUTH0_URL`), `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET`.
- The Bus client uses the same `AUTH0_*` settings plus `TOKEN_CACHE_TIME`.

`tc-core-library-js` reads the flag (`auth.useKeycloak`), and `helper.ts` gets the Bus
settings from `auth.wrapperSettings`, so the service and the core always agree. Any
value other than `true`/`false` fails at startup. In DEV the flag is
`/config/common/global-appvar/USE_KEYCLOAK`; the CircleCI deploy already loads
`/config/common/global-appvar` and `/config/resources-api-v6/appvar`, and the Newman job
loads `global-appvar` too.

Incoming machine tokens: with `true`, Keycloak tokens are accepted, plus Auth0 tokens
while `LEGACY_M2M_ISSUERS`/`LEGACY_M2M_AUDIENCE` are set. With `false`, Auth0 tokens
are accepted through `LEGACY_M2M_*`, plus Keycloak tokens while `KEYCLOAK_ISSUER` and
`KEYCLOAK_AUDIENCE` are set, so callers that have not switched yet keep working. This
branch no longer defaults `VALID_ISSUERS` or `AUTH_SECRET`, so both modes rely on the
deployed values.

**Rollback:** set `USE_KEYCLOAK=false` and force a new deployment so tasks re-read SSM.
No code or dependency change is needed. Keep the Auth0 settings above in SSM until
Keycloak has been accepted.

The DEV issuer is `https://keycloak.topcoder-dev.com/realms/topcoder-m2m-dev`,
audience `https://api.topcoder-dev.com`, and managed endpoint
`https://keycloak.topcoder-dev.com/m2m/token`. The managed endpoint passed DEV deployment acceptance; enable this configuration
only with workload-specific grants and rollout approval.

Member sessions remain Auth0. Keep `VALID_ISSUERS` and `AUTH_SECRET` where legacy
member HMAC tokens are supported. Set `AUTH_USER_AUDIENCES` to a JSON array, or
explicitly retain existing user-token audience behavior with
`ALLOW_LEGACY_USER_AUDIENCE=true`. Never apply that exception to M2M tokens.
`LEGACY_M2M_ISSUERS` and `LEGACY_M2M_AUDIENCE` let Auth0 machine tokens pass the same
normalizer (see the provider switch above).

`tc-core-library-js` owns signature, issuer, audience, lifetime, and machine/user
classification. Service adapters must use its verified `kind`, `isMachine`, and
`scopes` rather than decode/reclassify claims. Scope guards delegate exact matching
to the library with explicit all/any policy. Existing business roles and documented
scope aliases remain endpoint policy; adding OAuth scopes to a user token never
grants machine access. No permissive fallback or synthetic token path is available.

Before rollout run this project's `nvm use`, `pnpm lint`, `pnpm build`, and targeted
authentication tests. Validate real authorized/unauthorized routes with both a
Keycloak service token and a member token, including wrong audiences and insufficient
scopes. Switch only after every downstream receiver accepts the issuer. The core never
retries a failed Keycloak request against Auth0; rolling back is the explicit
`USE_KEYCLOAK=false` change above.

The Express adapter retains string member IDs and never invents a member ID for
a service. All route machine checks use common `hasScopes` with explicit any-scope
alternatives. Missing route scopes deny service access. Authentication errors
become sanitized 401 responses, including services with the older error handler.

Anonymous resource reads remain available without credentials. If a machine token
is supplied, it must meet the route scopes even on those reads. The Postman M2M
helper follows `USE_KEYCLOAK` (Keycloak, or the `AUTH0_*` credentials); existing member
login helpers remain separate.

Validation on 23 October 2026 (USE_KEYCLOAK switch): lint/build and the four compiled
checks pass. `test/unit/m2m-provider.test.ts` proves `false`/unset sends the Auth0
request and Bus settings and `true` the Keycloak ones. `pnpm test`: 23 passing; the
two database hook failures need a local Postgres and also fail on the unchanged baseline.
