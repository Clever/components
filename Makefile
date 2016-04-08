JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -name "bundle.js")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*")

.PHONY: test lint

lint:
	./node_modules/.bin/eslint $(JS_FILES) $(JSX_FILES)

MOCHA_JSX := node_modules/mocha/bin/mocha --compilers jsx:babel-register --recursive --require ignore-styles

test: lint
	NODE_ENV=test $(MOCHA_JSX) $@

BABEL := node_modules/babel-cli/bin/babel.js

build:
	@rm -rf dist
	@echo '✓ Clean out dist directory'
	@cp -r src dist
	@echo '✓ Copy /src to /dist'
	@$(BABEL) dist -d dist > ._babel_tmp && rm ._babel_tmp
	@echo '✓ Convert ES6 to ES5'
	@find ./dist -name "*.jsx" | xargs -d"\n" rm
	@echo '✓ Remove JSX files'
