import dotenv from 'dotenv';
import { Request, Response } from 'express';
import createConnection from '../utils/createConnection';
import getSpotifyPlayer from '../utils/getSpotifyPlayer';
import { delay } from '../utils/helpers';

dotenv.config();

const getPlay = async (req: Request, res: Response): Promise<Response> => {
  const { params } = req;

  const spotifyPlayer = getSpotifyPlayer();
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.tagId);

  if (!tag) {
    return res.status(404).send({
      error: `Tag Id not found.`,
    });
  }

  const { platform } = tag;

  if (platform === 'spotify') {
    try {
      const devices = await spotifyPlayer.getDevices();

      // check if all devices are all in_active
      if (
        devices.length > 0 &&
        devices.filter((device) => device.is_active).length === 0
      ) {
        // either get default device_id in .env or first device from device list
        const defaultDeviceId = process.env.spotify_default_device_id as string;
        const deviceId =
          defaultDeviceId === '' ? (devices[0].id as string) : defaultDeviceId;

        // hack: takes a second for Spotify API to add device to device list
        await spotifyPlayer.transferPlayback([deviceId]);
        await delay(1000);
        await spotifyPlayer.play(tag);
      } else {
        await spotifyPlayer.play(tag);
      }
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

const getDevices = async (_: Request, res: Response): Promise<Response> => {
  try {
    const spotifyPlayer = getSpotifyPlayer();
    const devices = await spotifyPlayer.getDevices();
    return res.status(200).send({
      message: 'ok',
      devices,
    });
  } catch (e) {
    return res.status(500).send({
      error: `${e}`,
    });
  }
};

export { getPlay, getDevices };
