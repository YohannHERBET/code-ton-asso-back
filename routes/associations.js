const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
  getAssociations,
  getLatestAssociations,
  getAssociation,
  updateAssociation,
  deleteAssociation,
} = require('../controllers/associations');

router.get('/', getAssociations);
router.get('/latest', getLatestAssociations);
router.get('/:slug', getAssociation);
router.put('/:id', auth, updateAssociation);
router.delete('/:id', auth, deleteAssociation);

module.exports = router;
