#!/bin/bash

set -e

BASE_FOLDER="_base/${FOLDER_NAME}"
SECTION_FOLDER="etc/package-generator/section"
FILE_DEPENDENCIES="etc/package-generator/section/package-config/dependencies/dev-depedencies.txt"

_CREATE_PACKAGE() {
  lerna create ${FOLDER_NAME} --yes --description="${DESCRIPTION}"

  mkdir -p ${BASE_FOLDER}/etc/rollup && cp ${SECTION_FOLDER}/build-config/template/rollup.config.js ${BASE_FOLDER}/etc/rollup
  mv ${BASE_FOLDER}/lib ${BASE_FOLDER}/src
  cp ${SECTION_FOLDER}/linter/template/.eslintrc ${BASE_FOLDER}/
  cp ${SECTION_FOLDER}/linter/template/.prettierrc ${BASE_FOLDER}/
  cp ${SECTION_FOLDER}/package-config/template/.npmignore ${BASE_FOLDER}/
  cp ${SECTION_FOLDER}/typescript-config/template/tsconfig.json ${BASE_FOLDER}/
  cp ${SECTION_FOLDER}/unit-testing/template/jest.config.js ${BASE_FOLDER}/
  rm ${BASE_FOLDER}/src/${FOLDER_NAME}.js
  rm -rf ${BASE_FOLDER}/__tests__
  cp ${SECTION_FOLDER}/package-config/template/index.ts ${BASE_FOLDER}/src/
  cp -r ${SECTION_FOLDER}/package-config/template/test ${BASE_FOLDER}/src/

  _INSTALL_DEPENDENCIES
}

_INSTALL_DEPENDENCIES() {
  cd ${BASE_FOLDER}
  cat ../../${FILE_DEPENDENCIES} | xargs yarn add -D
  node -e "let pkg=require('./package.json'); pkg.name='${PACKAGE_NAME}'; delete pkg.main; delete pkg.directories; delete pkg.files; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
  node -e "let pkg=require('./package.json'); pkg.publishConfig={'registry': 'https://npm.pkg.github.com/'}; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
  node -e "let pkg=require('./package.json'); pkg.publishConfig={'registry': 'https://npm.pkg.github.com/'}; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
  node -e "let pkg=require('./package.json'); pkg.scripts={'test': 'jest -w 2 --verbose src --cache', 'test:watch': 'jest --watch --coverage=true', 'compile': \"ASSET_PATH='${BASE_FOLDER}' CONFIG_PATH='${BASE_FOLDER}' bash ../../etc/build-asset/build.sh\", 'prepublishOnly': 'cp -r ./lib/* .'}; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
  cd ../../

}

_MAIN() {
  if [ -d "_base/${FOLDER_NAME}" ]; then
    echo "[ERROR] Package is already"
  else
    _CREATE_PACKAGE
  fi
}

_MAIN "$@"; exit
