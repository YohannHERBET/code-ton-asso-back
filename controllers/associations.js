const db = require('../models');
const { Association } = db;

const getAssociations = async (req, res) => {
  const associations = await Association.findAll();
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
  getAssociation,
  createAssociation,
  updateAssociation,
  deleteAssociation,
};