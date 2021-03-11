const createConnection = require('../utils/createConnection');
const getSpotifyPlayer = require('../utils/getSpotifyPlayer');

const getPlay = async (req, res) => {
  const { params } = req;

  const spotifyPlayer = getSpotifyPlayer();
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.tagId);

  const { platform } = tag;

  if (platform === 'spotify') {
    try {
      await spotifyPlayer.play(tag);
      return res.status(200).send({
        message: 'ok',
      });
    } catch (e) {
      return res.status(500).send({
        error: `${e}`,
      });
    }
  }

  return res.status(400).send({
    error: `platform not found`,
  });
};

module.exports = {
  getPlay,
};
