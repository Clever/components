#!/usr/bin/env bash

set -e

./node_modules/.bin/webpack

git add docs/

git commit

git subtree push --prefix docs origin gh-pages
