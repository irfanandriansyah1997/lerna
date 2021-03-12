#!/bin/bash

set -e

MAJOR_KEYWORD="(major)"
MINOR_KEYWORD="(minor)"
PATCH_KEYWORD="(patch)"
BUMP_KEYWORD="(bump)"
COMMIT_LOG=$(git log -1 --pretty=format:"%s")


_MAIN() {
  echo "_MAIN"

  if [[ $CI_STAGE_NAME = "BUILD" ]]; then
    echo "STAGE: BUILD"

    _STAGE_BUILD
  elif [[ $CI_STAGE_NAME = "TEST" ]]; then
    echo "STAGE: TEST"

    _STAGE_TEST
  elif [[ $CI_STAGE_NAME = "CHECK_COMMIT" ]]; then
    echo "STAGE: CHECK_COMMIT"

    _STAGE_COMMIT
  else
    echo "UNKNOWN STAGE. EXIT!"
    exit 1
  fi

}

# ===============================================
# Stage Check Commit
# ===============================================
_STAGE_COMMIT() {
  readonly local FILTER_COUNT=$(echo "$COMMIT_LOG" | grep -c "$COMMIT_FILTER" )
  echo $COMMIT_LOG
  echo $COMMIT_FILTER

  if [[ "$FILTER_COUNT" -eq 0 ]]; then
    echo "all good, continue"
  else
    echo "skip ci"
    exit 78
  fi
}

# ===============================================
# Stage Test
# ===============================================
_STAGE_TEST() {
  _INSTALL_DEPENDENCY
  _COMPILE_ASSET

  yarn run test
  yarn run lint
}

# ===============================================
# Stage Build
# ===============================================
_STAGE_BUILD() {
  readonly local FORMATTED_BRANCH=${CURRENT_BRANCH#refs/heads/}
  readonly local IS_MAJOR=$(echo "$COMMIT_LOG" | grep -c "$MAJOR_KEYWORD" )
  readonly local IS_MINOR=$(echo "$COMMIT_LOG" | grep -c "$MINOR_KEYWORD" )
  readonly local IS_PATCH=$(echo "$COMMIT_LOG" | grep -c "$PATCH_KEYWORD" )
  readonly local IS_BUMP=$(echo "$COMMIT_LOG" | grep -c "$BUMP_KEYWORD" )
  readonly local IS_MASTER=$(echo "$FORMATTED_BRANCH" | grep -c "main" )
  readonly local IS_HOTFIX=$(echo "$FORMATTED_BRANCH" | grep -c "hotfix" )
  readonly local IS_FEATURE=$(echo "$FORMATTED_BRANCH" | grep -c "feature" )

  if [ "$IS_MAJOR" != 0 ] || [ "$IS_MINOR" != 0 ] || [ "$IS_PATCH" != 0 ] || [ "$IS_BUMP" != 0 ] ; then
    _INSTALL_DEPENDENCY
    _COMPILE_ASSET
  fi

  if [[ "$IS_MASTER" != 0 ]]; then
    _BUILD_MASTER
  elif [[ "$IS_HOTFIX" != 0 ]]; then
    _BUILD_HOTFIX
  elif [[ "$IS_FEATURE" != 0 ]]; then
    _BUILD_FEATURE
  fi
}

_BUILD_MASTER() {
  echo "_BUILD_MASTER"

  if [[ "$IS_MAJOR" != 0 ]]; then
    node_modules/.bin/lerna version major --yes --conventional-commits --conventional-graduate ${LERNA_ACTION}
  elif [[ "$IS_MINOR" != 0 ]]; then
    node_modules/.bin/lerna version minor --yes --conventional-commits --conventional-graduate ${LERNA_ACTION}
  elif [ "$IS_PATCH" != 0 ] || [ "$IS_BUMP" != 0 ] ; then
    node_modules/.bin/lerna version patch --yes --conventional-commits --conventional-graduate ${LERNA_ACTION}
  fi
}

_BUILD_FEATURE() {
  echo "_BUILD_FEATURE"

  if [[ "$IS_MAJOR" != 0 ]]; then
    node_modules/.bin/lerna version premajor --yes --conventional-commits --preid ${FORMATTED_BRANCH} ${LERNA_ACTION}
  elif [[ "$IS_MINOR" != 0 ]]; then
    node_modules/.bin/lerna version preminor --yes --conventional-commits --preid ${FORMATTED_BRANCH} ${LERNA_ACTION}
  elif [ "$IS_PATCH" != 0 ] || [ "$IS_BUMP" != 0 ] ; then
    node_modules/.bin/lerna version prepatch --yes --conventional-commits --preid ${FORMATTED_BRANCH} ${LERNA_ACTION}
  fi
}

_BUILD_HOTFIX() {
  echo "_BUILD_HOTFIX"

  if [ "$IS_MAJOR" != 0 ] || [ "$IS_MINOR" != 0 ] || [ "$IS_PATCH" != 0 ] || [ "$IS_BUMP" != 0 ] ; then
    node_modules/.bin/lerna version --yes prepatch --preid ${FORMATTED_BRANCH} ${LERNA_ACTION}
  fi
}

_INSTALL_DEPENDENCY() {
  echo "_INSTALL_DEPENDENCY"

  yarn
}

_COMPILE_ASSET() {
  echo "_COMPILE_ASSET"

  if [ "$IS_MAJOR" != 0 ] || [ "$IS_MINOR" != 0 ] || [ "$IS_PATCH" != 0 ] ; then
    make compile
  fi
}

_MAIN "$@"; exit
