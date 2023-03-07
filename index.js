const app = require('./module/app');

app.listen(app.get('port'), () => {
  console.log(`Server Listening on port ${app.get('url')}:${app.get('port')}`);
});
