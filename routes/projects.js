const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
