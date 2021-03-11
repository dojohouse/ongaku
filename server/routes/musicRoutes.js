const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

router.get('/play/:tagId', musicController.getPlay);

module.exports = router;
