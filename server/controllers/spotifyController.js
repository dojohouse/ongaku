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
  'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.redirect_uri, // Needs to be whitelisted in portal
  clientId: process.env.client_id,
  clientSecret: process.env.client_secret
});

const getLogin = async (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
};

const getCallback = async (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    return res.send({
      message: `${error}`
    });
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { body } = data;
    const { access_token, refresh_token, expires_in } = body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    // console.log('access_token:', access_token);
    // console.log('refresh_token:', refresh_token);

    // console.log(`Access token retrieved. Expires in ${expires_in} seconds.`);

    res.send({
      message: 'ok'
    });

    setInterval(async () => {
      console.log('Add refresh token scheduler');
      const data = await spotifyApi.refreshAccessToken();
      const { body } = data;
      const { access_token } = body;

      console.log('The access token has been refreshed!');
      console.log(`Access token ${access_token}`);

      spotifyApi.setAccessToken(access_token);
    }, expires_in / 2 * 1000);
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getMe = async (req, res) => {
  try {
    const response = await spotifyApi.getMe();
    const { body } = response;
    return res.status(200).send(body);
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getDevices = async (req, res) => {
  try {
    const response = await spotifyApi.getMyDevices()
    const { body } = response;
    const { devices } = body;
    return res.status(200).send({ devices });
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getNow = async (req, res) => {
  try {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    const { body } = response;
    return res.status(200).send({
      currentlyPlaying: body
    });
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getPlay = async (req, res) => {
  try {
    await spotifyApi.play();
    return res.status(200).send({
      message: 'ok'
    });
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getPlayTrack = async (req, res) => {
  try {
    const { params } = req;
    await spotifyApi.play({
      uris: [`spotify:track:${params.track_id}`]
    })
    return res.status(200).send({
      message: 'ok'
    })
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getPause = async (req, res) => {
  try {
    await spotifyApi.pause();
    return res.status(200).send({
      message: 'ok'
    });
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

const getSearch = async (req, res) => {
  res.redirect(`/search/tracks?${new URLSearchParams(req.query)}`);
};

const getSearchTrack = async (req, res) => {
  const { query: qs } = req;
  const { query } = qs;

  if (!query) {
    return res.send({
      error: 'query field missing'
    });
  }

  try {
    const response = await spotifyApi.searchTracks(query);
    return res.status(200).send({
      message: 'ok',
      results: response
    });
  } catch (error) {
    return res.send({
      message: `${error}`
    });
  }
};

module.exports = {
  getLogin,
  getCallback,
  getMe,
  getDevices,
  getNow,
  getPlay,
  getPlayTrack,
  getPause,
  getSearch,
  getSearchTrack
}