#!/usr/bin/env bash

. .env
set -e
npx web-ext lint -i build.sh
# npx web-ext build
npx web-ext sign -i build.sh --api-key "$JWT_ISSUER" --api-secret "$JWT_SECRET"