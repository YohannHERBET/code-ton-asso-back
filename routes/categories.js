const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

router.get('/', auth, getCategories);
router.get('/:id', auth, getCategory);
router.post('/', auth, createCategory);
router.put('/:id', auth, updateCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;