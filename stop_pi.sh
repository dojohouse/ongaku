#!/bin/bash

echo "***** Stopping Server *****"
cd server && npm run stop && cd ..

echo "***** Stopping Client *****"
forever stop "ongaku_client"

echo "***** Stopping NFC Reader *****"
PID=`ps -eaf | grep pn532_read_nfc.py | grep -v grep | awk '{print $2}'`
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi
