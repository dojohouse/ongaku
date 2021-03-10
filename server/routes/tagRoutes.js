const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/tags', tagController.getTags);
router.get('/tag/create', tagController.createTag);
router.get('/tag/:id', tagController.getTag);

module.exports = router;