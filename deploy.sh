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

./node_modules/.bin/webpack

git add docs/

git commit

git subtree push --prefix docs origin gh-pages

git push origin master

echo -e "\n\033[0;32m✓ Deployment complete. Verify at http://clever.github.io/components\033[0m\n";
