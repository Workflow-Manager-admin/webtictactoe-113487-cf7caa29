#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-113487-cf7caa29/web_frontend_workspace/web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

