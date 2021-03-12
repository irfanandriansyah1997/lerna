
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
	lerna run compile --scope="@irfanandriansyah1997/helper"
	lerna run compile --scope="@irfanandriansyah1997/model"

sample-code-feature:
	make -f Makefile-test sample-code-feature

sample-code-hotfix:
	make -f Makefile-test sample-code-hotfix
