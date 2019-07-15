#!/bin/bash

# Use relative directory
cd "${BASH_SOURCE%/*}"

NAME=$1
../node_modules/.bin/ts-node --project ../tsconfig.bin.json ./create_new_component.ts $NAME
