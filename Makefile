SHELL = /bin/bash
JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -path "./dist/*" -not -name "bundle.js" -not -path "./vendor/*")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./dist/*" -not -path "./vendor/*")
TS_FILES := $(shell find . -regex ".*\.tsx*" -not -path "./node_modules/*")
LESS_FILES := $(shell find . -name "*.less" -not -path "./node_modules/*" -not -path "./dist/*" -not -path "./vendor/*")
TESTS := $(shell find test -name "*_test*")
LINT := ./node_modules/.bin/eslint
STYLELINT := ./node_modules/.bin/stylelint --config ./.stylelintrc
MOCHA := node_modules/mocha/bin/mocha
MOCHA_OPTIONS := --compilers jsx:babel-register --require ignore-styles --require jsdom-global/register
BABEL := node_modules/babel-cli/bin/babel.js
WEBPACK := node_modules/webpack/bin/webpack.js

.PHONY: dev-server test lint clean es5 docs build new $(TESTS) styles sizing-styles border-styles
.PHONY: border-radius-styles deploy-docs generate

GREEN_CHECK_MARK := " \033[0;32m✓\033[0m"
clean:
	@echo -n 'Cleaning out dist directory...'
	@rm -rf dist
	@echo -e $(GREEN_CHECK_MARK)

es5:
	@echo -n 'Copying /src to /dist...'
	@cp -r src dist
	@echo -e $(GREEN_CHECK_MARK)

	@# Compile ts[x] first, since it may compile js[x] dependencies that we'll want to overwrite with
	@# the babel-compiled versions.
	@echo -n 'Converting .ts[x] to ES5...'
	@./node_modules/.bin/tsc --project ./tsconfig.build.json
	@echo -e $(GREEN_CHECK_MARK)

	@echo -n 'Converting .js[x] files to ES5...'
	@$(BABEL) src -d dist > ._babel_tmp && rm ._babel_tmp
	@echo -e $(GREEN_CHECK_MARK)

	@echo -n 'Removing .js[x] & .ts[x] files...'
	@find ./dist -regex ".*\.[jt]sx" | xargs -n1 rm
	@find ./dist -regex ".*\.ts" | xargs -n1 rm
	@echo -e $(GREEN_CHECK_MARK)

docs:
	@echo '✓ Rebuild docs'
	@$(WEBPACK)

build: clean es5 styles

styles:
	@echo "Building stylesheet"
	@$(WEBPACK) --config webpack_styles.config.js

generate: sizing-styles border-styles border-radius-styles

sizing-styles:
	@echo "Generating sizing style definitions..."
	@node genSizing.js

border-styles:
	@echo "Generating border style definitions..."
	@node genBorder.js

border-radius-styles:
	@echo "Generating border-radius style definitions..."
	@node genBorderRadius.js

LINT_MAX_LESS_PROBLEMS := 122
lint:
	@echo "Linting files..."
	@$(LINT) $(JS_FILES) $(JSX_FILES) $(TS_FILES)
	@$(STYLELINT) $(LESS_FILES) | tee /tmp/less-lint-output.txt || true
	@cat /tmp/less-lint-output.txt | sed -e 's/\(.\)/\1\n/g' | grep '✖' | wc -l > /tmp/less-lint-problem-count
	@if [[ "`cat /tmp/less-lint-problem-count`" -gt "$(LINT_MAX_LESS_PROBLEMS)" ]]; then \
		echo -e "\033[0;31m✖ You have `cat /tmp/less-lint-problem-count` errors which is more than $(LINT_MAX_LESS_PROBLEMS) problems reported by stylelint. Please check for stylelint errors in the changes you've made.\033[0m\n"; \
		exit 1; \
	elif [[ "`cat /tmp/less-lint-problem-count`" -lt "$(LINT_MAX_LESS_PROBLEMS)" ]]; then \
		echo -e "\033[0;31m✖ Congrats! You have `cat /tmp/less-lint-problem-count` errors, which is fewer than $(LINT_MAX_LESS_PROBLEMS) stylelint problems. Please make a change to lower the LINT_MAX_LESS_PROBLEMS in the Makefile.\033[0m\n"; \
		exit 1; \
	else \
		echo -e "\033[0;32m✓ No new lint errors found.\033[0m\n"; \
	fi

test: lint
	@echo "Running unit tests..."
	NODE_ENV=test $(MOCHA) $(MOCHA_OPTIONS) --recursive

$(TESTS):
	@echo "Running tests for $@"
	@$(LINT) $@
	@NODE_ENV=test $(MOCHA) $(MOCHA_OPTIONS) $@

dev-server:
	npm run-script dev-server

deploy-docs:
	./deploy.sh
