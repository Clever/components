JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -path "./dist/*" -not -name "bundle.js")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./dist/*")
LESS_FILES := $(shell find . -name "*.less" -not -path "./node_modules/*" -not -path "./dist/*")
TESTS := $(shell find test -name "*_test*")
LINT := ./node_modules/.bin/eslint
STYLELINT := ./node_modules/.bin/stylelint --config ./.stylelintrc
MOCHA := node_modules/mocha/bin/mocha
MOCHA_OPTIONS := --compilers jsx:babel-register --recursive --require ignore-styles --require jsdom-global/register
BABEL := node_modules/babel-cli/bin/babel.js
WEBPACK := node_modules/webpack/bin/webpack.js

.PHONY: dev-server test lint clean es5 build new $(TESTS) styles sizing-styles

clean:
	@echo '✓ Clean out dist directory'
	@rm -rf dist

es5:
	@cp -r src dist
	@echo '✓ Copy /src to /dist'
	@$(BABEL) dist -d dist > ._babel_tmp && rm ._babel_tmp
	@echo '✓ Convert ES6 to ES5'
	@find ./dist -name "*.jsx" | xargs -n1 rm
	@echo '✓ Remove JSX files'

build: clean es5 styles

styles:
	@echo "Building stylesheet"
	@$(WEBPACK) --config webpack_styles.config.js
	@cp dist/css/style* dist/css/style.css

sizing-styles:
	@echo "Generating sizing style definitions..."
	@node genSizing.js

LINT_MAX_LESS_PROBLEMS := 117
lint:
	@echo "Linting files..."
	@$(LINT) $(JS_FILES) $(JSX_FILES)
	@$(STYLELINT) $(LESS_FILES) | tee ./tmp/less-lint-output.txt || true
	@cat ./tmp/less-lint-output.txt | sed -e 's/\(.\)/\1\n/g' | grep '✖' | wc -l > ./tmp/less-lint-problem-count
	@if [[ "`cat ./tmp/less-lint-problem-count`" -gt "$(LINT_MAX_LESS_PROBLEMS)" ]]; then \
		echo "\033[0;31m✖ More than $(LINT_MAX_LESS_PROBLEMS) problems reported by stylelint. Please check for stylelint errors in the changes you've made.\033[0m\n"; \
		exit 1; \
	elif [[ "`cat ./tmp/less-lint-problem-count`" -lt "$(LINT_MAX_LESS_PROBLEMS)" ]]; then \
		echo "\033[0;31m✖ Congrats! You have `cat ./tmp/less-lint-problem-count` errors, which is fewer than $(LINT_MAX_LESS_PROBLEMS) stylelint problems. Please make a change to lower the LINT_MAX_LESS_PROBLEMS in the Makefile.\033[0m\n"; \
		exit 1; \
	else \
		echo "\033[0;32m✓ No new lint errors found.\033[0m\n"; \
	fi

test: lint
	@echo "Running unit tests..."
	@NODE_ENV=test $(MOCHA) $(MOCHA_OPTIONS) $@

$(TESTS):
	@echo "Running tests for $@"
	@$(LINT) $@
	@NODE_ENV=test $(MOCHA) $(MOCHA_OPTIONS) $@

dev-server:
	npm run-script dev-server
