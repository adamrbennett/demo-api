#!/usr/bin/env sh

set -e

echo "Building spec"
npm run build-spec

echo "Waiting on dependencies..."

wait-for $SOCKET_API -- echo "API is available"

echo
echo "Running tests..."

echo "dredd $@"
exec dredd "$@"
