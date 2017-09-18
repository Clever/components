#!/bin/bash

# Use relative directory
cd "${BASH_SOURCE%/*}"

NAME=$1
DIR_PATH=$2
../node_modules/.bin/ts-node \
	--project ../tsconfig.json \
	./create_new_sub_component.ts $NAME $DIR_PATH
