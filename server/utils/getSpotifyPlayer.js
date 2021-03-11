require('dotenv').config();
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
  'user-follow-modify',
];

class SpotifyApi {
  static _instance = null;
  static _proxy = null;

  constructor() {
    this._proxy = new SpotifyWebApi({
      redirectUri: process.env.redirect_uri, // Needs to be whitelisted in portal
      clientId: process.env.client_id,
      clientSecret: process.env.client_secret,
    });
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new SpotifyApi();      
      console.log(`[SpotifyApi]`);
      console.log(this._instance);      
      console.log(SpotifyApi.login);
    }
    return this._instance;
  }

  login = () => {
    return this._proxy.createAuthorizeURL(scopes)
  }

  callback = async (code) => {
    const data = await this._proxy.authorizationCodeGrant(code);
    const { body } = data;
    const { access_token, refresh_token, expires_in } = body;

    this._proxy.setAccessToken(access_token);
    this._proxy.setRefreshToken(refresh_token);

    setInterval(async () => {
      const data = await this._proxy.refreshAccessToken();
      const { body } = data;
      const { access_token } = body;

      console.log('The access token has been refreshed!');
      console.log(`Access token ${access_token}`);

      this._proxy.setAccessToken(access_token);
    }, (expires_in / 2) * 1000);    
  }

  play = async (tag) => {
    if (tag.music_id.includes('track')) {      
      return this._proxy.play({
        uris: [tag.music_id],
      });
    } 
    
    return this._proxy.play({
      context_uri: tag.music_id,
    });
  }
}

const getSpotifyPlayer = () => {
  return SpotifyApi.getInstance();
}

module.exports = getSpotifyPlayer;