#!/bin/bash

# Use relative directory
cd "${BASH_SOURCE%/*}"

NAME=$1
../node_modules/.bin/ts-node --project ../tsconfig.json ./create_new_demo.ts $NAME
