
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
	node_modules/.bin/lerna run compile --scope="@irfanandriansyah1997/model"
	node_modules/.bin/lerna run compile --scope="@irfanandriansyah1997/constant"

sample-code-feature:
	make -f Makefile-test sample-code-feature

sample-code-hotfix:
	make -f Makefile-test sample-code-hotfix
