#!/bin/sh
if [ -d "node_modules/" ];then
    clear & node .
else
    npm install
    clear & node .
fi