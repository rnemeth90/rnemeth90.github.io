SHELL := bash
.ONESHELL:
.SHELLFLAGS := -euo pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ifeq ($(origin .RECIPEPREFIX), undefined)
	$(error This Makefile requires GNU Make 4.0 or higher)
endif
.RECIPEPREFIX := >

# DEFAULT
.PHONY: build

build:
> mdbook build -d ../rnemeth90.github.io/public/notes

