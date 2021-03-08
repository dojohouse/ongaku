# Ongaku Server

## Getting Started

1. Login on `https://developer.spotify.com/dashboard/login`

2. Create an app 

3. Go to `Edit Settings`

4. Add `http://localhost:8888/callback` in `Redirect URIs` section

5. Create a copy `.env.config` to `.env`
    ```sh
    cp .env.config .env
    ```

6. Copy `Client ID` & `Client Secret` to `.env`
    ```sh
    # Credentials
    client_id='[your-client-id]'
    client_secrets='[your-client-secrets]'
    redirect_uri='http://localhost:8888/callback'
    ```

7. Install the project with `npm install` and run application with `node app.js`
