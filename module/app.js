const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('../models');

dotenv.config();

// récupération du router custom
const router = require('./router');

// On dit à notre application de tenir compte de ce router :
app.use(router);

app.set('port', process.env.PORT);
app.set('url', process.env.URL);


app.listen(app.get('port'), () => {
   console.log(
       `Server Listening on port ${app.get('url')}:${app.get('port')}`
   );
});

module.exports = app;
