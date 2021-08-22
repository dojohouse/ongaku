import { Router } from 'express';
import { getPlay, getPause } from '../controllers/musicController';

const router = Router();

router.get('/play/:tagId', getPlay);
router.get('/pause', getPause);

export default router;
