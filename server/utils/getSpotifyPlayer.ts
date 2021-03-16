/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';
import { Tag } from '../models';

dotenv.config();

const scopes: string[] = [
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
  static _instance: SpotifyApi | null = null;
  private _proxy?: SpotifyWebApi | null = null;

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
    }
    return this._instance;
  }

  login = (): string => {
    return this._proxy!.createAuthorizeURL(scopes, '');
  };

  callback = async (code: string): Promise<void> => {
    const data = await this._proxy!.authorizationCodeGrant(code);
    const { body } = data;
    const { access_token, refresh_token, expires_in } = body;

    this._proxy!.setAccessToken(access_token);
    this._proxy!.setRefreshToken(refresh_token);

    setInterval(async () => {
      const data = await this._proxy!.refreshAccessToken();
      const { body } = data;
      const { access_token } = body;

      console.log('The access token has been refreshed!');
      console.log(`Access token ${access_token}`);

      this._proxy!.setAccessToken(access_token);
    }, (expires_in / 2) * 1000);
  };

  play = async (tag: Tag) => {
    if (tag.musicId.includes('track')) {
      return this._proxy!.play({
        uris: [tag.musicId],
      });
    }

    return this._proxy!.play({
      context_uri: tag.musicId,
    });
  };

  playDefaultDevice = async (deviceId: string) => {
    return this._proxy!.play({
      device_id: deviceId,
    });
  };

  getDevices = async (): Promise<SpotifyApi.UserDevice[]> => {
    const data = await this._proxy!.getMyDevices();
    const { body } = data;
    const { devices } = body;
    return devices;
  };

  transferPlayback = async (deviceId: string[]) => {
    await this._proxy!.transferMyPlayback(deviceId);
  };
}

const getSpotifyPlayer = (): SpotifyApi => {
  return SpotifyApi.getInstance();
};

export default getSpotifyPlayer;
