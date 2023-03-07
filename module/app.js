const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('../models');
const router = require('../routes');
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

dotenv.config();

app.set('port', process.env.PORT);
app.set('url', process.env.URL);

const options = { limit: '1mb', extended: false };
app.use(express.json(options));

app.use(router);

module.exports = app;