const getSpotifyPlayer = require('../utils/getSpotifyPlayer');

const spotifyPlayer = getSpotifyPlayer();

const getSpotifyLogin = async (req, res) => {
  res.redirect(spotifyPlayer.login());
};

const getSpotifyCallback = async (req, res) => {
  const { query } = req;
  const { error, code } = query;

  if (error) {
    console.error('Callback Error:', error);
    return res.send({
      message: `${error}`,
    });
  }

  await spotifyPlayer.callback(code);

  return res.send({
    message: 'ok',
  });
};

module.exports = {
  getSpotifyLogin,
  getSpotifyCallback,
};
