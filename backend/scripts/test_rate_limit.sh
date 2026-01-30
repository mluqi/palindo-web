#!/usr/bin/env bash
# Simple rate-limit tester using curl
# Usage: ./scripts/test_rate_limit.sh [URL] [API_KEY] [COUNT] [DELAY]
# Example: ./scripts/test_rate_limit.sh http://localhost:8003/api/v1/wilayah/provinsi mykey 120 0.1

URL=${1:-http://localhost:8003/api/v1/wilayah/provinsi}
API_KEY=${2:-}
COUNT=${3:-120}
DELAY=${4:-0}

echo "Testing rate limiter against: $URL"
echo "Requests: $COUNT  Delay: $DELAY sec  API_KEY: ${API_KEY:+provided}" 

for i in $(seq 1 $COUNT); do
  # get headers only, discard body
  headers=$(curl -s -D - -o /dev/null ${API_KEY:+-H "x-palindo-api-key: $API_KEY"} "$URL")
  # HTTP status is on first header line
  status=$(echo "$headers" | sed -n '1p' | awk '{print $2}')
  rl_rem=$(echo "$headers" | grep -i '^RateLimit-Remaining:' | awk '{print $2}' | tr -d '\r')
  rl_limit=$(echo "$headers" | grep -i '^RateLimit-Limit:' | awk '{print $2}' | tr -d '\r')
  rl_reset=$(echo "$headers" | grep -i '^RateLimit-Reset:' | awk '{print $2}' | tr -d '\r')
  printf "%3d -> %s  Remain:%s Limit:%s Reset:%s\n" "$i" "${status:-?}" "${rl_rem:-n/a}" "${rl_limit:-n/a}" "${rl_reset:-n/a}"
  if [ "$status" = "429" ]; then
    echo "==> Received 429 Too Many Requests at attempt $i"
    exit 0
  fi
  if (( $(echo "$DELAY > 0" | bc -l) )); then
    sleep $DELAY
  fi
done

echo "Done. No 429 observed in $COUNT requests."
