#!/bin/bash

set -e

_MAIN() {
  echo "_MAIN"
  rm -rf ../../${ASSET_PATH}/lib && ../../node_modules/.bin/tsc && ../../node_modules/.bin/rollup -c ../../${CONFIG_PATH}/etc/rollup/rollup.config.js
  mv ../../${ASSET_PATH}/lib/src/* ../../${ASSET_PATH}/lib
  rm -rf ../../${ASSET_PATH}/lib/src
  find ../../${ASSET_PATH}/lib -type d -name 'test' | xargs rm -rf
  rm -rf ../../${ASSET_PATH}/.rollup.cache/
}

_MAIN "$@"; exit
