import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import {qrRoutes} from './routes';
const tagRoutes = require('./routes/tagRoutes');
const musicRoutes = require('./routes/musicRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/', (_, res) => {
  res.send(':)');
});

app.use('/api', tagRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
