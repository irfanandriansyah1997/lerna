
###########################################################################
## Make file
## @author: Irfan Andriansyah <irfan@99.co>
## @since: 2020.03.22
###########################################################################
default:

###########################################################################
## Compile Asset
###########################################################################
compile:
	node_modules/.bin/lerna run compile --scope="@irfanandriansyah1997/helper"
	node_modules/.bin/lerna run compile --scope="@irfanandriansyah1997/testing"

sample-code-feature:
	LERNA_ACTION="--skip-git --no-changelog" CURRENT_BRANCH="refs/heads/feature-versioning" CI_STAGE_NAME="BUILD" COMMIT_FILTER="ci(sh)" COMMIT_LOG="merge(main -> release) (patch)" sh etc/deployments/cd.sh
	@git checkout _base/

sample-code-hotfix:
	make -f Makefile-test sample-code-hotfix

###########################################################################
## Package CLI
###########################################################################
create-package:
	@node_modules/.bin/ts-node -T -r tsconfig-paths/register --project ./tsconfig-cli.json etc/package-generator/index.ts