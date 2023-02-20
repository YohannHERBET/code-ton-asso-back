const db = require('../models');
const { Feature } = db;

const getFeatures = async (req, res) => {
  const features = await Feature.findAll();
  if (!features) {
    return res.status(404).send({ message: 'Aucune fonctionnalité trouvée' });
  }
  res.json(features);
}

const getFeature = async (req, res) => {
  const feature = await Feature.findOne({
    where: { id: req.params.id },
  });
  if (!feature) {
    return res.status(404).send({ message: 'La fonctionnalité n\'a pas été trouvée'});
  }
  res.json(feature);
}

const createFeature = async (req, res) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json(feature);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
}

const updateFeature = async (req, res) => {
  const feature = await Feature.findOne({ where: { id: req.params.id }});
  if (!feature) {
    return res.status(404).send({ message:
      'La fonctionnalité n\'a pas été trouvée' });
  }
  await Feature.update(req.body, { where: { id: req.params.id }});
  res.json(feature);
}

const deleteFeature = async (req, res) => {
  const feature = await Feature.findOne({ where: { id: req.params.id }});
  if (feature) {
    await Feature.destroy({
      where: { id: req.params.id },
    });
    return res.send({ message: 'Fonctionnalité supprimée' });
  }
  res.status(404).send({ message: 'Fonctionnalité non trouvée' });
}

module.exports = {
  getFeatures,
  getFeature,
  createFeature,
  updateFeature,
  deleteFeature,
};