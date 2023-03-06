const { Op } = require('sequelize');

const db = require('../models');
const { Developer, User } = db;

const getDevelopers = async (req, res) => {
  const developers = await User.findAll({
    where: { developer_id: { [Op.ne]: null } },
    include: [{ all: true, nested: true }],
  });
  res.json(developers);
};

const getLastDevelopers = async (req, res) => {
  const developers = await User.findAll({
    limit: 3,
    where: { developer_id: { [Op.ne]: null } },
    order: [['createdAt', 'DESC']],
    include: ['developer'],
  });
  if (!developers) {
    return res.status(404).send({ message: 'Aucun utilisateur trouvé' });
  }
  res.json(developers);
};

const getDeveloper = async (req, res) => {
  const developer = await Developer.findOne({
    where: { slug: req.params.slug },
    include: [{ all: true, nested: true }],
  });
  if (!developer) {
    return res
      .status(404)
      .send({ message: "Le développeur n'a pas été trouvé" });
  }
  res.json(developer);
};

const createDeveloper = async (req, res) => {
  const developer = await Developer.create(req.body);
  res.json(developer);
};

const updateDeveloper = async (req, res) => {
  const developer = await Developer.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(developer);
};

const deleteDeveloper = async (req, res) => {
  const developer = await Developer.destroy({
    where: { id: req.params.id },
  });
  res.json(developer);
};

module.exports = {
  getDevelopers,
  getLastDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
};
