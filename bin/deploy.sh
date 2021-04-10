#!/bin/bash

TARGET_PROJECT=$1

if [[ $TARGET_PROJECT = project1 ]]; then
    SCRIPT_ID="1Ow_vJfkZZ8aqyRsk-OVvU5MFeJ_HvjyT1wrtDAElvsaGZ71QeBKq0AWZ"
elif [[ $TARGET_PROJECT = project2 ]]; then
    SCRIPT_ID="1m96Emk1hxg5DJ-KDVu-9MU4HgggsR-NzIpGVl-5Ns1S-IlkVDauv-MA1"
else
    echo 'usage: ./bin/deploy.sh <project1|project2>'
    exit 1
fi

echo '{"scriptId":"'$SCRIPT_ID'","rootDir":"./dist"}' > .clasp.json

# clasp push & deploy with comment

message="[`date "+%y-%m-%d %H:%M:%S"`] '`git log --no-merges -1 --oneline | cut -b 9-`'"

`./projects/$TARGET_PROJECT/clasp push`
`./projects/$TARGET_PROJECT/clasp deploy -d "${message}"`
