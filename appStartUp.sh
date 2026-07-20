#!/usr/bin/env bash
set -euo pipefail

# Deployment parameters can contain escaped characters when loaded from the
# parameter store. Preserve the existing normalization before Prisma reads it.
if [[ -n "${DATABASE_URL:-}" ]]; then
  export DATABASE_URL="$(printf '%b' "$DATABASE_URL")"
fi

echo "Database - applying existing migrations."
./node_modules/.bin/prisma migrate deploy

echo "Starting resource-api-v6."
exec node dist/main.js
