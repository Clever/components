JSX_TESTS := $(shell find ./test \! -name "._*.js" -name "*_test.js")
JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*" -not -name "bundle.js")
JSX_FILES := $(shell find . -name "*.jsx" -not -path "./node_modules/*")

.PHONY: test lint

lint:
	./node_modules/.bin/eslint --fix --no-color $(JS_FILES) $(JSX_FILES)

MOCHA_JSX := node_modules/mocha/bin/mocha --compilers jsx:babel-register --recursive --require ignore-styles

test: lint
	NODE_ENV=test $(MOCHA_JSX) $@
