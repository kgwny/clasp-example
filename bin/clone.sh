#!/bin/bash

printf "Input Project Name >> "; read project_name

mkdir ${project_name} && cd ${project_name} && touch index.ts
clasp clone --rootDir './dist'
cp ./dist/appsscript.json ./
