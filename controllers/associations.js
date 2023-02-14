const { Op } = require("sequelize");

const db = require('../models');
const { Association, User } = db;

const getAssociations = async (req, res) => {
  const associations = await Association.findAll();
  res.send(associations);
}

const getLatestAssociations = async (req, res) => {
  const associations = await User.findAll({
    limit: 3,
    where : { association_id: { [Op.ne]: null } },
    order: [['createdAt', 'DESC']],
    include: ['association'],
  });
  if (!associations) return res.status(404).send('Aucune association trouvée.');
  res.send(associations);
}

const getAssociation = async (req, res) => {
  const association = await Association.findOne({
    where: { id: req.params.id },
  });
  res.send(association);
}

const createAssociation = async (req, res) => {
  const association = await Association.create(req.body);
  res.send(association);
}



const updateAssociation = async (req, res) => {
  const association = await Association.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(association);
}

const deleteAssociation = async (req, res) => {
  const association = await Association.destroy({
    where: { id: req.params.id },
  });
  res.send(association);
}

module.exports = {
  getAssociations,
  getLatestAssociations,
  getAssociation,
  createAssociation,
  updateAssociation,
  deleteAssociation,
};