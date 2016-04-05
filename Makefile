JSX_TESTS := $(shell find ./test \! -name "._*.js" -name "*_test.js")

.PHONY: test

MOCHA_JSX := node_modules/mocha/bin/mocha --compilers jsx:babel-register --recursive --require ignore-styles

test:
	NODE_ENV=test $(MOCHA_JSX) $@
