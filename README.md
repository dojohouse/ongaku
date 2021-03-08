<img src="ongaku.png" align="right" width="60">

# Ongaku 音楽 ("Music")

Personal Vinyl Record Player  :notes:
- Generate your own Music Cards and listen with a simple tap!
- Every Music Card is linked to a Spotify song, playlist, or album
  - With QR technology or NFC Tags


*Inspired* by [Spotify Vinyl Emulator](https://www.hackster.io/mark-hank/sonos-spotify-vinyl-emulator-3be63d)

## Server

### Getting Started

1. Login on `https://developer.spotify.com/dashboard/login` to setup your developer credentials

2. Create an app 

3. Go to `Edit Settings`

4. Add `http://localhost:8888/api/spotify/callback` in `Redirect URIs` section

5. Create a copy `.env.config` to `.env`
    ```sh
    cp .env.config .env
    ```

6. Copy `Client ID` & `Client Secret` to `.env`
    ```sh
    # Credentials
    client_id='[your-client-id]'
    client_secret='[your-client-secret]'
    redirect_uri='http://localhost:8888/api/spotify/callback'
    ```

7. Install the project with `npm install` and run application with `node server.js`
