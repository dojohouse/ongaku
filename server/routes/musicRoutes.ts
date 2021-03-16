import {Router} from 'express';
import {getPlay} from '../controllers/musicController';

const router = Router();

router.get('/play/:tagId', getPlay);

export default router;
