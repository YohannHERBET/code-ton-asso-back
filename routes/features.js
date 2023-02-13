const express = require('express');
const router = express.Router();

const {
  getFeatures,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature
} = require('../controllers/features');

router.get('/', getFeatures);
router.get('/:id', getFeature);
router.post('/', createFeature);
router.put('/:id', updateFeature);
router.delete('/:id', deleteFeature);

module.exports = router;