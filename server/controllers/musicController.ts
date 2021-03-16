import { Request, Response } from 'express';
import createConnection from '../utils/createConnection';
import getSpotifyPlayer from '../utils/getSpotifyPlayer';

const getPlay = async (req: Request, res: Response): Promise<Response> => {
  const { params } = req;

  const spotifyPlayer = getSpotifyPlayer();
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.tagId);

  if (!tag) {
    return res.status(400).send({
      error: `Tag Id not found.`,
    });
  }

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

export { getPlay };
