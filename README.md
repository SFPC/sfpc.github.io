sfpc_site
=========

## why

hugo-darwin-386 is a compiled version of the hugo site generator. it's very fast.

## how

### to run locally:

./hugo-darwin-386 -S -w

(but index is screwed up but can be previewed at /indexhtml)

ctrl + C stops the local server

### to edit

content lives as markdown files in /content

### to generate:

./hugo-darwin 386 -b "http://sfpc.io"

to fix index before push: mv public/indexhtml "index.html"