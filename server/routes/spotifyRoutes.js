const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/login', spotifyController.getLogin);
router.get('/callback', spotifyController.getCallback);
router.get('/me', spotifyController.getMe);
router.get('/devices', spotifyController.getDevices);
router.get('/now', spotifyController.getNow);
router.get('/play', spotifyController.getPlay);
router.get('/play/track/:track_id', spotifyController.getPlayTrack);
router.get('/pause', spotifyController.getPause);
router.get('/search', spotifyController.getSearch);
router.get('/search/tracks', spotifyController.getSearchTrack);

module.exports = router;
