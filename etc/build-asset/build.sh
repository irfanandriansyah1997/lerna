#!/bin/bash

set -e

_MAIN() {
  echo "_MAIN"
  rm -rf ../../${ASSET_PATH} && ../../node_modules/.bin/tsc && ../../node_modules/.bin/rollup -c ../../${CONFIG_PATH}/etc/rollup/rollup.config.js
  mv ../../${ASSET_PATH}/src/* ../../${ASSET_PATH}
  rm -rf ../../${ASSET_PATH}/src
  find ../../${ASSET_PATH} -type d -name 'test' | xargs rm -rf
}

_MAIN "$@"; exit
