import {Router} from 'express';
import {getTags, postTag, getTag, patchTag, deleteTag} from '../controllers/tagController';

const router = Router();

router.get('/tags', getTags);
router.post('/tag', postTag);
router.get('/tag/:id', getTag);
router.patch('/tag/:id', patchTag);
router.delete('/tag/:id', deleteTag);

export default router;
