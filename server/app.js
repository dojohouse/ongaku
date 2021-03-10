require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const tagRoutes = require('./routes/tagRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const qrRoutes = require('./routes/qrRoutes');

const app = express();
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send(':)');
});

app.use('/api', tagRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api/qr', qrRoutes);

module.exports = app;
