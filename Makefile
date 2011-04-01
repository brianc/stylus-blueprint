.PHONY: build

build:
	@mkdir build
	@cd test
	@jade --out ../build *
	@stylus --out ../build *
