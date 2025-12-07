#!/usr/bin/env bash

# verify required parameters
[[ "$BROWSER_NAME" -eq 0 ]] && { echo "Missing required parameter BROWSER_NAME" ; exit 1; }

# get browser name from environment
browserName=$BROWSER_NAME

# create output folder
mkdir -p dist/$browserName

# copy files
cp -r _locales/ icons/ README.md LICENSE.md background.js manifest-$browserName.json dist/$browserName

# rename manifest file
(cd dist/$browserName && mv manifest-$browserName.json manifest.json)

# create zip file
(cd dist/$browserName && zip -r ../$browserName.zip *)