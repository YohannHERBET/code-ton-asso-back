const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getDevelopers,
  getLastDevelopers,  
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper
} = require('../controllers/developers');

router.get('/', auth, getDevelopers);
router.get('/latest', auth, getLastDevelopers);
router.get('/:id', auth, getDeveloper);
router.post('/', auth, createDeveloper);
router.put('/:id', auth, updateDeveloper);
router.delete('/:id', auth, deleteDeveloper);

module.exports = router;