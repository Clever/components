#!/bin/bash

# Use relative directory
cd "${BASH_SOURCE%/*}"

NAME=$1
../node_modules/.bin/ts-node --project ../tsconfig.bin.json ./create_new_component.ts $NAME
npx jscodeshift --componentName="$NAME" -t ./addToSidebar.ts ../docs/components/SideBar/SideBar.jsx
../node_modules/.bin/prettier --write ../docs/components/SideBar/SideBar.jsx
npx jscodeshift --componentName="$NAME" -t ./addRoute.ts ../docs/docs.jsx
../node_modules/.bin/prettier --write ../docs/docs.jsx
npx jscodeshift --componentName="$NAME" -t ./addScreenshot.ts ../docs/components/ComponentsView.jsx
../node_modules/.bin/prettier --write ../docs/components/ComponentsView.jsx
