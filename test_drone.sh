#!/usr/bin/env bash
set -e -u

npm config set registry https://registry.npmjs.org
npm cache clean
npm install

make test
make build
