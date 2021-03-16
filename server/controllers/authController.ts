import {Request, Response} from 'express';
import getSpotifyPlayer from '../utils/getSpotifyPlayer';

const spotifyPlayer = getSpotifyPlayer();

const getSpotifyLogin = async (req: Request, res: Response) => {
  res.redirect(spotifyPlayer.login());
};

const getSpotifyCallback = async (req: Request, res: Response) => {
  const { query } = req;
  const { error, code } = query;

  if (error) {
    console.error('Callback Error:', error);
    return res.send({
      message: `${error}`,
    });
  }

  try {
    await spotifyPlayer.callback(code as string);
  } catch (e) {
    return res.status(400).send({
      error: `${e}`,
    });
  }
 
  return res.send({
    message: 'ok',
  });
};

export {
  getSpotifyLogin,
  getSpotifyCallback,
};
