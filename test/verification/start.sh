#!/bin/sh
echo
echo Verification Test Runner
echo
echo API URL: $API_URL

ENV_FILE="env.json"

if [ -z "$API_URL" ]; then
  echo "API_URL must be defined."
  exit 1;
fi

echo
echo "Generating environment file..."

cat > $ENV_FILE <<EOF
{
  "name": "test-verification",
  "values": [
    {
      "enabled": true,
      "key": "SERVICE_URL",
      "value": "${API_URL}",
      "type": "text"
    }
  ]
}
EOF

echo "newman $@"
exec newman "$@"
