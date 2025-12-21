#!/usr/bin/env bash

# verify required parameters
if [ -z "$1" ]
  then
    echo "Missing required parameter. Specify either chromium or firefox"
    exit 1
fi

# get browser name from environment
browserName=$1

# create output folder
mkdir -p dist/$browserName

# copy files
cp -r _locales/ icons/ README.md LICENSE.md background.js manifest-$browserName.json dist/$browserName

# rename manifest file
(cd dist/$browserName && mv manifest-$browserName.json manifest.json)

# create zip file
(cd dist/$browserName && zip -r ../$browserName.zip *)