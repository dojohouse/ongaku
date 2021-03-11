const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/tags', tagController.getTags);
router.post('/tag', tagController.postTag);
router.get('/tag/:id', tagController.getTag);
router.patch('/tag/:id', tagController.patchTag);

module.exports = router;
