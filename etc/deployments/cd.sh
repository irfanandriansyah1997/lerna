#!/bin/bash
MAJOR_KEYWORD="(major)"
MINOR_KEYWORD="(minor)"
PATCH_KEYWORD="(keyword)"

readonly local COMMIT_LOG=$(git log -1 --pretty=format:"%s")


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
    exit 1
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
  readonly local IS_MAJOR=$(echo "$COMMIT_LOG" | grep -c "$MAJOR_KEYWORD" )
  readonly local IS_MINOR=$(echo "$COMMIT_LOG" | grep -c "$MINOR_KEYWORD" )
  readonly local IS_PATCH=$(echo "$COMMIT_LOG" | grep -c "$PATCH_KEYWORD" )

  _INSTALL_DEPENDENCY
  _COMPILE_ASSET

  if [[ "$IS_MAJOR" != 0 ]]; then
    echo "update major version"
    lerna version major --yes --conventional-commits --conventional-graduate --no-git-tag-version --no-push
  elif [[ "$IS_MINOR" != 0 ]]; then
    echo "update minor version"
    lerna version minor --yes --conventional-commits --conventional-graduate --no-git-tag-version --no-push
  elif [[ "$IS_PATCH" != 0 ]]; then
    echo "update patch version"
    lerna version patch --yes --conventional-commits --conventional-graduate --no-git-tag-version --no-push
  fi
}

_INSTALL_DEPENDENCY() {
  echo "_INSTALL_DEPENDENCY"

  yarn
  yarn global add lerna
}

_COMPILE_ASSET() {
  echo "_COMPILE_ASSET"

  if [ "$IS_MAJOR" != 0 ] || [ "$IS_MINOR" != 0 ] || [ "$IS_PATCH" != 0 ] ; then
    make compile
  fi
}

_MAIN "$@"; exit
