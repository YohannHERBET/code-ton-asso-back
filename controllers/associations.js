const { Op } = require('sequelize');

const db = require('../models');
const { Association, User } = db;

const getAssociations = async (req, res) => {
  const associations = await Association.findAll({
    include: [{ all: true, nested: true }],
  });
  if (!associations) return res.status(404).send('Aucune association trouvée.');
  res.json(associations);
};

const getLatestAssociations = async (req, res) => {
  const associations = await User.findAll({
    limit: 3,
    where: { association_id: { [Op.ne]: null } },
    order: [['createdAt', 'DESC']],
    include: ['association'],
  });
  if (!associations) return res.status(404).send('Aucune association trouvée.');
  res.json(associations);
};

const getAssociation = async (req, res) => {
  const association = await Association.findOne({
    where: { slug: req.params.slug },
    include: [{ all: true, nested: true }],
  });
  if (!association) {
    return res
      .status(404)
      .send({ message: "L'association n'a pas été trouvée" });
  }
  res.json(association);
};

const createAssociation = async (req, res) => {
  try {
    const association = await Association.create(req.body);
    res.json(association);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
};

const updateAssociation = async (req, res) => {
  const association = await Association.findOne({
    where: { id: req.params.id },
  });
  if (!association) return res.status(404).send('Association non trouvée.');
  await Association.update(req.body, { where: { id: req.params.id } });
  res.json(association);
};

const deleteAssociation = async (req, res) => {
  const association = await Association.findOne({
    where: { id: req.params.id },
  });
  if (association) {
    await Association.destroy({
      where: { id: req.params.id },
    });
    return res.send({ message: 'Association supprimée' });
  }
  res.status(404).send({ message: 'Association non trouvée' });
};

module.exports = {
  getAssociations,
  getLatestAssociations,
  getAssociation,
  createAssociation,
  updateAssociation,
  deleteAssociation,
};
