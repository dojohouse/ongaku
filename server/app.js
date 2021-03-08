require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];
  
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.redirect_uri, // Needs to be whitelisted in portal
  clientId: process.env.client_id,
  clientSecret: process.env.client_secret
});

const app = express();

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});
  
app.get('/callback', async (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }
  
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const {body} = data;
    const {access_token, refresh_token, expires_in} = body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    console.log('access_token:', access_token);
    console.log('refresh_token:', refresh_token);

    console.log(`Access token retrieved. Expires in ${expires_in} seconds.`);    
    res.send('Success! You can now close the window.');

    setInterval(async () => {
      const data = await spotifyApi.refreshAccessToken();
      const {body} = data;
      const {access_token} = body;

      console.log('The access token has been refreshed!');
      console.log(`Access token ${access_token}`);
            
      spotifyApi.setAccessToken(access_token);
    }, expires_in / 2 * 1000);

  } catch (error) {
    console.error('Error getting Tokens:', error);
    res.send(`Error getting Tokens: ${error}`);
  }
});
  
app.get('/me', async (req, res) => {
  try {
    const response = await spotifyApi.getMe();
    const {body} = response;
    return res.status(200).send(body);
  } catch {
    return res.send('Please login first')
  }
});

app.listen(8888, () => {
  console.log('Ongaku server up. Now go to http://localhost:8888/login in your browser.');
});  
