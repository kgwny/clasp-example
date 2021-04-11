#!/bin/bash

printf "Input application name >> "; read app_name

mkdir ${app_name} && cd ${app_name} && touch index.ts
clasp clone --rootDir './dist'
cp ./dist/appsscript.json ./
