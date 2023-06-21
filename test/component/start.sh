#!/usr/bin/env sh

set -e

echo "Waiting on dependencies..."

wait-for $SOCKET_API -- echo "API is available"

echo
echo "Running tests..."

echo "newman $@"
exec newman "$@"
