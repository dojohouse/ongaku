const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.get('/create', qrController.getCreate);

module.exports = router;
