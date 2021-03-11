const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/spotify/login', authController.getSpotifyLogin);
router.get('/spotify/callback', authController.getSpotifyCallback);

module.exports = router;
