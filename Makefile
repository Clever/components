include node.mk

SHELL = /bin/bash
NODE_VERSION := "v12"
$(eval $(call node-version-check,$(NODE_VERSION)))

JEST := ./node_modules/.bin/jest --maxWorkers=1 --config ./jestconfig.json
JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -path "./dist/*" -not -name "bundle.js")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./dist/*")
TS_FILES := $(shell find bin/ src/ test/ -regex ".*\.tsx*")
LESS_FILES := $(shell find . -name "*.less" -not -path "./node_modules/*" -not -path "./dist/*")
LINT := ./node_modules/.bin/eslint
STYLELINT := ./node_modules/.bin/stylelint --config ./stylelint.config.js
TESTS_TS := $(shell find . -regex ".*_test\.tsx*" -not -path "./node_modules/*" -not -path "./bin/*")
TESTS := $(TESTS_TS)
FORMATTED_FILES := $(JS_FILES) $(JSX_FILES) $(TS_FILES) $(TSX_FILES) $(LESS_FILES)
MODIFIED_FILES := $(shell git diff --name-only master $(FORMATTED_FILES))
WEBPACK := npx webpack

.PHONY: dev-server test lint format-check clean compile docs build new $(TESTS) gen-sizing-styles
.PHONY: gen-border-styles gen-border-radius-styles deploy-docs generate gen-colors

GREEN_CHECK_MARK := " \033[0;32m✓\033[0m"
RED_CROSS_MARK := "❌"

RED := "\033[0;31m"
ENDCOLOR := "\033[0m"

format-all:
	@./node_modules/.bin/prettier --write $(FORMATTED_FILES)

format:
	@./node_modules/.bin/prettier --write $(MODIFIED_FILES)

format-check:
	@./node_modules/.bin/prettier -l $(FORMATTED_FILES) || \
	(echo -e $(RED_CROSS_MARK) $(RED) Prettier diffs in the above files! Run 'make format' to fix! $(ENDCOLOR) && false)

# Clean up build artifacts
clean:
	@echo -n 'Cleaning out dist directory...'
	@rm -rf dist
	@echo -e $(GREEN_CHECK_MARK)

compile:
	@echo -n 'Copying /src to /dist...'
	@cp -r src dist
	@cp -r src dist/es
	@echo -e $(GREEN_CHECK_MARK)

	@echo -n 'Compiling TypeScript to JavaScript...'
	@find dist -regex ".*\.tsx*" | xargs -n1 rm
	@./node_modules/.bin/tsc --project ./tsconfig.build.json
	@./node_modules/.bin/tsc --project ./tsconfig.build.json -m es6 --outDir dist/es
	@echo -e $(GREEN_CHECK_MARK)

docs:
	@echo '✓ Rebuild docs'
	@$(WEBPACK)

build: clean compile

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

LINT_MAX_LESS_PROBLEMS := 96
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

test: format-check lint unit-test

unit-test:
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
