#!/bin/bash
MAJOR_KEYWORD="(major)"
MINOR_KEYWORD="(minor)"
PATCH_KEYWORD="(keyword)"

readonly local COMMIT_LOG=$(git log -1 --pretty=format:"%s")

readonly local IS_MAJOR=$(echo "$COMMIT_LOG" | grep -c "$MAJOR_KEYWORD" )
readonly local IS_MINOR=$(echo "$COMMIT_LOG" | grep -c "$MINOR_KEYWORD" )
readonly local IS_PATCH=$(echo "$COMMIT_LOG" | grep -c "$PATCH_KEYWORD" )

if [[ "$IS_MAJOR" -eq 0 ]]; then
  lerna version major --yes --conventional-commits --conventional-graduate --skip-git
else if [[ "$IS_MINOR" -eq 0 ]]; then
  lerna version minor --yes --conventional-commits --conventional-graduate --skip-git
else if [[ "$IS_PATCH" -eq 0 ]]; then
  lerna version patch --yes --conventional-commits --conventional-graduate --skip-git
else
  lerna version --yes --conventional-commits --conventional-graduate --skip-git
fi
