import { Router } from 'express';
import {
  getSpotifyLogin,
  getSpotifyCallback,
} from '../controllers/authController';

const router = Router();

router.get('/spotify/login', getSpotifyLogin);
router.get('/spotify/callback', getSpotifyCallback);

export default router;
