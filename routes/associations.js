const express = require('express');
const router = express.Router();

const {
  getAssociations,
  getLatestAssociations,
  getAssociation,
  createAssociation,
  updateAssociation,
  deleteAssociation
} = require('../controllers/associations');

router.get('/', getAssociations);
router.get('/latest', getLatestAssociations);
router.get('/:id', getAssociation);
router.post('/', createAssociation);
router.put('/:id', updateAssociation);
router.delete('/:id', deleteAssociation);

module.exports = router;