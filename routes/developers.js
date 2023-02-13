const express = require('express');
const router = express.Router();

const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper
} = require('../controllers/developers');

router.get('/', getDevelopers);
router.get('/:id', getDeveloper);
router.post('/', createDeveloper);
router.put('/:id', updateDeveloper);
router.delete('/:id', deleteDeveloper);

module.exports = router;