// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const { User, Project, Association, Developer } = db;

// router.get('/', (req, res) => {
//   res.write('hello');
//   res.write(' how are you?');
//   res.end();
// });

// router.get('/users', async (req, res) => {
//   const users = await User.findAll({
//     include: ['developer', 'association']
//   });
//   res.send(users);
// })

// router.get('/projects', async (req, res) => {

//   const projects = await Project.findAll(
//   //   {
//   //   include: [{
//   //     model: db.Developer,
//   //     through: {
//   //       attributes: ['developerId'],
//   //     },
//   //   }],
//   // }
//   );
//   res.send(projects);
// });

// router.get('/associations', async (req, res) => {
//   // get les associations en bdd
//   // const associations = await Association.findAll({
//   //   attributes: ['id', 'association_name']
//   // });
//   res.send(associations);
// });

// router.get('/developers', (req, res) => {
//   res.send('GET /developers'); // to adjust
// });

// router.get('/project/:id', async (req, res) => {
//   const project = await Project.findOne({
//     where: { id: req.params.id },
//     include: [{
//       model: db.Developer,
//       // get user name associated to developer
//       attributes: ['id'],
//       through: {
//       },
//     }],
//   });
//   res.send(project);
// });

// router.get('/association/:slug', (req, res) => {
//   res.send('GET /association/:slug'); // to adjust
// });

// router.get('/developers/:slug', (req, res) => {
//   res.send('GET /developers/:slug'); // to adjust 
// });

// router.get('/user', (req, res) => {
//   res.send('GET user'); // to adjust
// })

// router.post('/user', (req, res) => {
//   res.send('POST /user');
// });

// router.post('/project', (req, res) => {
//   res.send('POST /project'); // to adjust
// });

// router.post('/connexion', (req, res) => {
//   res.send('POST /connexion'); // to adjust
// });

// router.delete( '/project/:slug', (req, res) => {
//   res.send('DELETE /project/:slug'); // to adjust
// });

// router.delete( '/developer/:slug', (req, res) => {
//   res.send('DELETE /developer/:slug'); // to adjust
// });

// router.patch('/project/:slug', (req, res) => {
//   res.send('PATCH /project/:slug'); // to adjust
// });


// module.exports = router;