#!/bin/bash

TEST_TYPE="$1"

if [ -z "$TEST_TYPE" ]; then
    echo "Usage: run.sh <test type> [test arguments...]"
    exit 1
fi

TEST_FILE="docker-compose.test-$TEST_TYPE.yaml"

if [ ! -f "$TEST_FILE" ]; then
    echo "Unable to locate compose test configuration: $TEST_FILE"
    exit 2
fi

docker-compose --file $TEST_FILE run --rm $TEST_TYPE-test-runner "${@:2}"
rc=$?
docker-compose --file $TEST_FILE down -v
exit $rc