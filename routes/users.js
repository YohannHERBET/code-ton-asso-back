const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.post('/', auth, createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;