#!/bin/bash

echo "***** Starting Server *****"
cd server && npm run serve && cd ..

echo "***** Starting Client *****"
forever start -a --uid "ongaku_client" client/serve.js

echo "***** Starting NFC Reader *****"
cd nfc && source venv/bin/activate
nohup python3 -u pn532_read_nfc.py > ongaku_nfc.log 2>&1 &
