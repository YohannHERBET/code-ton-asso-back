const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getTypes,
  getType,
  createType,
  updateType,
  deleteType
} = require('../controllers/types');

router.get('/', auth, getTypes);
router.get('/:id', auth, getType);
router.post('/', auth, createType);
router.put('/:id', auth, updateType);
router.delete('/:id', auth, deleteType);

module.exports = router;