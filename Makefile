UNIT_TESTS = $(shell find ./quill/static/quill/js/test -name "*.js")
JS_FILES = $(shell find ./quill/static -name "*.js" -not -path "./quill/static/quill/js/test/*.js" -not -path "./quill/static/quill/js/build/*")
PY_FILES = $(shell find ./quill -name "*.py")

test:
	flake8 --ignore=E501 $(PY_FILES)
	./node_modules/.bin/jshint $(JS_FILES) $(UNIT_TESTS)
ifeq ($(CI),true)
	./node_modules/.bin/browserify -t coverify $(UNIT_TESTS) | ./node_modules/.bin/testling
else
	./node_modules/.bin/browserify -t coverify $(UNIT_TESTS) | ./node_modules/.bin/testling | ./node_modules/.bin/faucet
endif

docs:
	rm -rf out
	jsdoc quill/static/quill/js/ README.md

coverage:
	./node_modules/.bin/browserify -t coverify $(UNIT_TESTS) | ./node_modules/.bin/testling | ./node_modules/.bin/coverify

build:
	rm -f quill/static/quill/js/build/quill-django.js
	rm -f quill/static/quill/js/build/quill-django.min.js
	./node_modules/.bin/browserify $(JS_FILES) -o quill/static/quill/js/build/quill-django.js
	./node_modules/.bin/uglifyjs quill/static/quill/js/build/quill-django.js > quill/static/quill/js/build/quill-django.min.js

watch:
	./node_modules/.bin/watchify $(JS_FILES) -o quill/static/quill/js/build/quill-django.min.js

.PHONY: build coverage docs test watch
