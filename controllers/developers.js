const { Op } = require("sequelize");

const db = require('../models');
const { Developer, User } = db;

const getDevelopers = async (req, res) => {
  const developers = await User.findAll({
    where : { developer_id: { [Op.ne]: null } },
    include: ['developer']
  });
  res.send(developers);
}

const getLastDevelopers = async (req, res) => {
  const developers = await User.findAll({
    limit: 3,
    where : { developer_id: { [Op.ne]: null } },
    order: [['createdAt', 'DESC']],
    include: ['developer'],
  });
  if (!developers) {
    return res.status(404).send({ message: 'Aucun utilisateur trouvé' });
  }
  res.json(developers);
}

const getDeveloper = async (req, res) => {
  const developer = await User.findOne({
    where: { developer_id: req.params.id },
    include: ['developer']
  });
  res.send(developer);
}

const createDeveloper = async (req, res) => {
  const developer = await Developer.create(req.body);
  res.send(developer);
}

const updateDeveloper = async (req, res) => {
  const developer = await Developer.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(developer);
}

const deleteDeveloper = async (req, res) => {
  const developer = await Developer.destroy({
    where: { id: req.params.id },
  });
  res.send(developer);
}

module.exports = {
  getDevelopers,
  getLastDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
};