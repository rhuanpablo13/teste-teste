#!/bin/bash

readonly DEPLOY_API="deploy-api.sh";

chmod +x $DEPLOY_API;
gnome-terminal -x bash -c "./$DEPLOY_API; exec $SHELL";

cd packages/web  && npm start
