#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${1:-resources-api-v6}"

export DOCKER_BUILDKIT=1
docker build \
  --file docker/Dockerfile \
  --tag "${APP_NAME}:latest" \
  .
