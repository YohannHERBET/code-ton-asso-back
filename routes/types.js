const express = require('express');
const router = express.Router();

const {
  getTypes,
  getType,
  createType,
  updateType,
  deleteType
} = require('../controllers/types');

router.get('/', getTypes);
router.get('/:id', getType);
router.post('/', createType);
router.put('/:id', updateType);
router.delete('/:id', deleteType);

module.exports = router;