const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skills');

router.get('/', getSkills);
router.get('/:id', getSkill);
router.post('/', auth, createSkill);
router.put('/:id', auth, updateSkill);
router.delete('/:id', auth, deleteSkill);

module.exports = router;
