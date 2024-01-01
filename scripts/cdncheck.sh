#!/usr/bin/env sh

if grep -Er 'https?://[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' "src/"; then
  echo "ERROR: convert local IPs to a different url first."
  exit 1
fi