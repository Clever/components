#!/usr/bin/env bash

set -e

./node_modules/.bin/webpack

git subtree push --prefix docs origin gh-pages
