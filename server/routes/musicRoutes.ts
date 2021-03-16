import { Router } from 'express';
import { getPlay, getDevices } from '../controllers/musicController';

const router = Router();

router.get('/play/:tagId', getPlay);
router.get('/devices', getDevices);

export default router;
