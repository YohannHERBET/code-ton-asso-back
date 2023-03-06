const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  joinProject,
  quitProject,
} = require('../controllers/projects');

router.get('/', getProjects);
router.post('/join', auth, joinProject);
router.delete('/quit', auth, quitProject);
router.get('/:slug', getProject);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
