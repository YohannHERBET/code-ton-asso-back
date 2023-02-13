const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('../models');
const router = require('../routes');

dotenv.config();

const options = { limit: '1mb', extended: false };
app.use(express.json(options));

app.use(router);

app.set('port', process.env.PORT);
app.set('url', process.env.URL);

app.listen(app.get('port'), () => {
   console.log(
       `Server Listening on port ${app.get('url')}:${app.get('port')}`
   );
});

module.exports = app;
