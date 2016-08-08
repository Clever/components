JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -path "./dist/*" -not -name "bundle.js")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*" -not -path "./dist/*")
TESTS := $(shell find test -name "*_test*")
LINT := ./node_modules/.bin/eslint
MOCHA := node_modules/mocha/bin/mocha
MOCHA_OPTIONS := --compilers jsx:babel-register --recursive --require ignore-styles --require jsdom-global/register
BABEL := node_modules/babel-cli/bin/babel.js
LESS := node_modules/less/bin/lessc

.PHONY: dev-server test lint clean es5 build new $(TESTS) styles

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
	@mkdir dist/css

build: clean es5

styles:
	@echo "Building stylesheet"
	@$(LESS) less/index.less

lint:
	@echo "Linting files..."
	@$(LINT) $(JS_FILES) $(JSX_FILES)

test: lint
	@echo "Running unit tests..."
	@NODE_ENV=test $(MOCHA) $(MOCHA_OPTIONS) $@

$(TESTS):
	@echo "Running tests for $@"
	@$(LINT) $@
	@NODE_ENV=test $(MOCHA) $(MOCHA_OPTIONS) $@

dev-server:
	npm run-script dev-server
