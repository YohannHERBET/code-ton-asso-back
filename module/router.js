const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.write('hello');
  res.write(' how are you?');
  res.end();
});

router.get('/projects', (req, res) => {
  res.send('GET /projects'); // to adjust
});

router.get('/associations', async (req, res) => {
  // get les associations en bdd
});

router.get('/developers', (req, res) => {
  res.send('GET /developers'); // to adjust
});

router.get('/project/:slug', (req, res) => {
  res.send('GET /project/:slug'); // to adjust
});

router.get('/association/:slug', (req, res) => {
  res.send('GET /association/:slug'); // to adjust
});

router.get('/developers/:slug', (req, res) => {
  res.send('GET /developers/:slug'); // to adjust 
});

router.get('/user', (req, res) => {
  res.send('GET user'); // to adjust
})

router.post('/user', (req, res) => {
  res.send('POST /user');
});

router.post('/project', (req, res) => {
  res.send('POST /project'); // to adjust
});

router.post('/connexion', (req, res) => {
  res.send('POST /connexion'); // to adjust
});

router.delete( '/project/:slug', (req, res) => {
  res.send('DELETE /project/:slug'); // to adjust
});

router.delete( '/developer/:slug', (req, res) => {
  res.send('DELETE /developer/:slug'); // to adjust
});

router.patch('/project/:slug', (req, res) => {
  res.send('PATCH /project/:slug'); // to adjust
});


module.exports = router;