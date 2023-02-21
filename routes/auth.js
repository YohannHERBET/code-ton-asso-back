const express = require('express');
const router = express.Router();

const {
  login,
  createDeveloperAccount,
  createAssociationAccount,
} = require('../controllers/auth');

router.post('/login', login);
router.post('/create-dev', createDeveloperAccount);
router.post('/create-asso', createAssociationAccount);

module.exports = router;
