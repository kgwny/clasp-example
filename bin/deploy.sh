#!/bin/bash

TARGET_APP=$1
APP1_SCRIPT_ID="1Ow_vJfkZZ8aqyRsk-OVvU5MFeJ_HvjyT1wrtDAElvsaGZ71QeBKq0AWZ"
APP2_SCRIPT_ID="1m96Emk1hxg5DJ-KDVu-9MU4HgggsR-NzIpGVl-5Ns1S-IlkVDauv-MA1"
APP3_SCRIPT_ID="1vjrzBOyzCjcV29aVydPKpuQYYMMzs_gatKT7ZXpNgSmErY8e3XUkzyiH"

if [[ $TARGET_APP = "createNewFile" ]]; then
    SCRIPT_ID=$APP1_SCRIPT_ID
elif [[ $TARGET_APP = "logExample" ]]; then
    SCRIPT_ID=$APP2_SCRIPT_ID
elif [[ $TARGET_APP = "trigger" ]]; then
    SCRIPT_ID=$APP3_SCRIPT_ID
else
    echo 'usage: ./bin/deploy.sh [application name]'
    exit 1
fi

# update .clasp.json
echo '{"scriptId":"'$SCRIPT_ID'","rootDir":"./dist"}' > .clasp.json

# clasp push & deploy with comment
MSG="[`date "+%y-%m-%d %H:%M:%S"`] '`git log --no-merges -1 --oneline | cut -b 9-`'"
cd main/$TARGET_APP && clasp push && clasp deploy -d "${MSG}"
