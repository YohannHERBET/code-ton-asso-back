const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
  getAssociations,
  getLatestAssociations,
  getAssociation,
  createAssociation,
  updateAssociation,
  deleteAssociation
} = require('../controllers/associations');

router.get('/', auth, getAssociations);
router.get('/latest', auth, getLatestAssociations);
router.get('/:id', auth, getAssociation);
router.post('/', auth, createAssociation);
router.put('/:id', auth, updateAssociation);
router.delete('/:id', auth, deleteAssociation);

module.exports = router;