# resource-api-v6

## Shared authentication and bus client (v6 refresh)

This branch uses `tc-core-library-js` **4.0.0-rc.1**. Use its named
`createJwtVerifier` / `createJwtAuthenticator`, `createM2MClient`, and
`createBusApiClient` exports for shared authentication and bus API publishing.
Service-specific roles, scopes, sessions and ownership checks remain in this service.
The former bus wrapper dependency and local JWT cryptography must not be reintroduced.

RSA verification requires an exact configured issuer and audience (`JWT_AUDIENCE`
for client tokens, `AUTH0_AUDIENCE` for machine/API tokens, or this service's explicit
issuer-policy settings). HMAC secrets must be at least 32 bytes; no default secret
is supplied. Expiry is enforced. Machine identity comes from the shared verifier,
not the presence of scopes. Supply real development credentials through the service's
existing environment configuration before deployment.

Bus publishers use `createBusApiClient(config).postEvent(event)` with the existing
event envelope and optional key. Configure `BUSAPI_URL` for v6 and the existing
OAuth credentials/token provider. The client uses bounded HTTPS requests and does
not retry POSTs automatically. Application retry/outbox behavior remains local.

See the [core migration guide](https://github.com/topcoder-platform/tc-core-library-js/blob/v4.0.0-rc.1/MIGRATION.md)
for the API mapping, compatibility requirements, and rollout scope.

## Alpine Node runtime packages

Container stages that install Node through APK constrain `nodejs-current` to the
major version in `NODE_VERSION`, rather than an exact Alpine package revision.
Alpine replaces older patch packages in its repositories; the compatible pin
allows current security patches while a build-time check rejects a different
Node major. The runtime keeps Alpine's dynamically linked Node and system
libraries. Existing non-root users and application entrypoints are preserved.
Build stages using a versioned official Node image retain their configured
version, and pnpm build arguments are explicitly declared in the consuming stage.
