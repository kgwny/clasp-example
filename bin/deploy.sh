#!/bin/bash

TARGET_PROJECT=$1
PROJECT1_SCRIPT_ID="1Ow_vJfkZZ8aqyRsk-OVvU5MFeJ_HvjyT1wrtDAElvsaGZ71QeBKq0AWZ"
PROJECT2_SCRIPT_ID="1m96Emk1hxg5DJ-KDVu-9MU4HgggsR-NzIpGVl-5Ns1S-IlkVDauv-MA1"

if [[ $TARGET_PROJECT = project1 ]]; then
    SCRIPT_ID=PROJECT1_SCRIPT_ID
elif [[ $TARGET_PROJECT = project2 ]]; then
    SCRIPT_ID=PROJECT2_SCRIPT_ID
else
    echo 'usage: ./bin/deploy.sh <project1|project2>'
    exit 1
fi

# update .clasp.json

echo '{"scriptId":"'$SCRIPT_ID'","rootDir":"./dist"}' > .clasp.json

# clasp push & deploy with comment

MSG="[`date "+%y-%m-%d %H:%M:%S"`] '`git log --no-merges -1 --oneline | cut -b 9-`'"

cd projects/$TARGET_PROJECT && clasp push && clasp deploy -d "${MSG}"