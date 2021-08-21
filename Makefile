SHELL := /bin/bash

.PHONY: list

list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

start:
	@echo "***** Starting Server *****"
	cd server && npm run serve && cd ..

	@echo "***** Starting Client *****"
	forever start -a --uid "ongaku_client" client/serve.js

	@echo "***** Starting NFC Reader *****"
	cd nfc && source venv/bin/activate && nohup python3 -u pn532_read_nfc.py > ongaku_nfc.log 2>&1 &

stop:
	@echo "***** Stopping Server *****"
	cd server && npm run stop && cd ..

	@echo "***** Stopping Client *****"
	forever stop "ongaku_client"

	@echo "***** Stopping NFC Reader *****"
	kill $$(ps aux | grep pn532_read_nfc.py | awk '{print $$2}')

clean-build:
	@echo "***** Builing Server *****"
	cd server && npm install && npm run build && cd ..

	@echo "***** Builing Client *****"
	cd client && npm install && npm run build && cd ..

	@echo "***** Builing NFC Reader *****"
	cd nfc && source venv/bin/activate && pip install -r requirements.txt
