#!/usr/bin/env bash

set -e

currentBranch=$(git symbolic-ref --short HEAD)
if [[ $currentBranch != "master" ]]
then
  echo -e "\n\033[0;31m✖ The deploy script must be run from the master branch.\033[0m\n";
  exit 1;
fi

diffWithOrigin=$(git diff --name-only origin/master)
if [[ $diffWithOrigin != "" ]]
then
  echo -e "\n\033[0;31m✖ Your local master branch must be in sync with origin/master.\033[0m\n";
  exit 1;
fi

npmVersion=$(npm view npm version | awk -F. '{ print $1 }')
if [[ npmVersion -gt 6 ]]
then
  echo -e "\n\033[0;32mRunning 'npm install' with --legacy-peer-deps\033[0m\n";
  # When on npm 7, the default behavior is to try and install peer dependencies.
  # This leads to installation conflicts, so fallback on old behavior.
  # https://github.blog/2021-02-02-npm-7-is-now-generally-available/#peer-dependencies
  # TODO: remove when we don't have conflicting peer dependencies.
  npm install --legacy-peer-deps
else
  npm install
fi

./node_modules/.bin/webpack

git add docs/

git commit || true

git subtree push --prefix docs origin gh-pages

git push origin master

echo -e "\n\033[0;32m✓ Deployment complete. Verify at http://clever.github.io/components\033[0m\n";
