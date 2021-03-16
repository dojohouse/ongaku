import {Router} from 'express';
import {getCreate} from '../controllers/qrController';

const router = Router();

router.get('/create', getCreate);

export default router;
