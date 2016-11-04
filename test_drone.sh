#!/usr/bin/env bash
set -e -u

npm install

make test
make build
rm -rf bin
