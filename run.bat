@echo off
IF EXIST "node_modules" (
    cls & node .
) ELSE (
    npm install & cls & node .
)
pause