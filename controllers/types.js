const db = require('../models');
const { Type } = db;

const getTypes = async (req, res) => {
  const types = await Type.findAll();
  if (!types) {
    return res.status(404).send({ message: 'Le type de projet n\'a pas été trouvé' });
  }
  res.json(types);
}

const getType = async (req, res) => {
  const type = await Type.findOne({
    where: { id: req.params.id },
  });
  if (!type) {
    return res.status(404).send({ message: 'Le type de projet n\'a pas été trouvé' });
  }
  res.json(type);
}

const createType = async (req, res) => {
  try {
    const type = await Type.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
}

const updateType = async (req, res) => {
  const type = await Type.findOne({ where: { id: req.params.id }});
  if (!type) {
    return res.status(404).send({ message: 'Le type de projet n\'a pas été trouvé' });
  }
  await Type.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(type);
}

const deleteType = async (req, res) => {
  const type = await Type.findOne({ where: { id: req.params.id } });
  if (type) {
    await Type.destroy({ where: { id: req.params.id } });
    return res.send({ message: 'Type de projet supprimé' });
  }
  res.status(404).send({ message: 'Type de projet non trouvé' });
}

module.exports = {
  getTypes,
  getType,
  createType,
  updateType,
  deleteType,
};