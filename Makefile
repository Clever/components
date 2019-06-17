include node.mk

SHELL = /bin/bash
NODE_VERSION := "v10"
$(eval $(call node-version-check,$(NODE_VERSION)))

BABEL := node_modules/babel-cli/bin/babel.js
JEST := ./node_modules/.bin/jest --maxWorkers=1 --config ./jestconfig.json
JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -path "./dist/*" -not -name "bundle.js")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./dist/*")
TS_FILES := $(shell find . -regex ".*\.tsx*" -not -path "./node_modules/*")
LESS_FILES := $(shell find . -name "*.less" -not -path "./node_modules/*" -not -path "./dist/*")
LINT := ./node_modules/.bin/eslint
STYLELINT := ./node_modules/.bin/stylelint --config ./stylelint.config.js
TESTS_JS := $(shell find . -regex ".*_test\.jsx*" -not -path "./node_modules/*")
TESTS_TS := $(shell find . -regex ".*_test\.tsx*" -not -path "./node_modules/*" -not -path "./bin/*")
TESTS := $(TESTS_JS) $(TESTS_TS)
FORMATTED_FILES := $(JS_FILES) $(JSX_FILES) $(TS_FILES) $(TSX_FILES) $(LESS_FILES)
MODIFIED_FILES := $(shell git diff --name-only master $(FORMATTED_FILES))
WEBPACK := node_modules/webpack/bin/webpack.js

.PHONY: dev-server test lint format-check clean es5 docs build new $(TESTS) styles gen-sizing-styles
.PHONY: gen-border-styles gen-border-radius-styles deploy-docs generate gen-colors

GREEN_CHECK_MARK := " \033[0;32m✓\033[0m"

format-all:
	@./node_modules/.bin/prettier --write $(FORMATTED_FILES)

format:
	@./node_modules/.bin/prettier --write $(MODIFIED_FILES)

format-check:
	@./node_modules/.bin/prettier -l $(FORMATTED_FILES) || \
	(echo "\033[0;31m**** Prettier errors in the above files! Run 'make format-all' to fix! ****\033[0m" && false)

# Reset the entire repository to a freshly cloned state
.PHONY: clobber
clobber: clean
	rm -rf log

# Clean up build artifacts
clean:
	@echo -n 'Cleaning out dist directory...'
	@rm -rf dist
	rm -rf log/*
	@echo -e $(GREEN_CHECK_MARK)

es5: log
	@echo -n 'Copying /src to /dist...'
	@cp -r src dist
	@echo -e $(GREEN_CHECK_MARK)

	@# Compile ts[x] first, since it may compile js[x] dependencies that we'll want to overwrite with
	@# the babel-compiled versions.
	@echo -n 'Converting .ts[x] to ES5...'
	@./node_modules/.bin/tsc --project ./tsconfig.build.json
	@echo -e $(GREEN_CHECK_MARK)

	@echo -n 'Converting .js[x] files to ES5...'
	@$(BABEL) src --out-dir dist > log/babel.log
	@echo -e $(GREEN_CHECK_MARK)

	@echo -n 'Removing .js[x] & .ts[x] files...'
	@find ./dist -regex ".*\.[jt]sx" | xargs -n1 rm
	@find ./dist -regex ".*\.ts" | xargs -n1 rm
	@echo -e $(GREEN_CHECK_MARK)

log:
	mkdir log

docs:
	@echo '✓ Rebuild docs'
	@$(WEBPACK)

build: clean es5 styles

styles:
	@echo "Building stylesheet"
	@$(WEBPACK) --config webpack_styles.config.js

generate: gen-sizing-styles gen-border-styles gen-border-radius-styles gen-colors

gen-colors:
	@echo "Generating color definitions..."
	@./node_modules/.bin/ts-node --project ./tsconfig.json genColors.ts

gen-sizing-styles:
	@echo "Generating sizing style definitions..."
	@node genSizing.js

gen-border-styles:
	@echo "Generating border style definitions..."
	@node genBorder.js

gen-border-radius-styles:
	@echo "Generating border-radius style definitions..."
	@node genBorderRadius.js

LINT_MAX_LESS_PROBLEMS := 94
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
	NODE_ENV=test $(JEST)

$(TESTS):
	@echo "Running tests for $@"
	@$(LINT) $@
	@NODE_ENV=test $(JEST) $@

dev-server:
	npm run-script dev-server

deploy-docs:
	./deploy.sh
