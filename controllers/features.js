const db = require('../models');
const { Feature } = db;

const getFeatures = async (req, res) => {
  const features = await Feature.findAll();
  res.send(features);
}

const getFeature = async (req, res) => {
  const feature = await Feature.findOne({
    where: { id: req.params.id },
  });
  res.send(feature);
}

const createFeature = async (req, res) => {
  const feature = await Feature.create(req.body);
  res.send(feature);
}

const updateFeature = async (req, res) => {
  const feature = await Feature.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(feature);
}

const deleteFeature = async (req, res) => {
  const feature = await Feature.destroy({
    where: { id: req.params.id },
  });
  res.send(feature);
}

module.exports = {
  getFeatures,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature,
};