# Raspberry Pi Setup

## Client

Install extra dependecies

```
npm install -g express
npm install -g forever
```

- Build: `npm run build`
- Run App: `forever start -a --uid "ongaku_client" serve.js`
   - Running on port 3000
- Stop App: `forever stop ongaku_client`
- Logs: `forever logs`


## Server

Install extra dependecies

```
npm install -g pm2
```

- Build: `npm run build`
- Run App: `npm run serve`
   - Running on port 8888
- Stop App: `npm run stop`
- Logs: `npm run logs`


## NFC

- Run App: `nohup python3 -u pn532_read_nfc.py > ongaku_nfc.log &`
- Logs: `tail ongaku_nfc.log`

To kill
```
ps ax | grep pn532_read_nfc.py
pkill ${PID}
```
