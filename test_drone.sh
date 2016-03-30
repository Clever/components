#!/usr/bin/env bash
set -e -u

sed -i.bak s/\${npm_auth_token}/$npm_auth_token/ .npmrc_docker
mv .npmrc_docker .npmrc
npm config set registry https://registry.npmjs.org
npm cache clean
npm install

make test

