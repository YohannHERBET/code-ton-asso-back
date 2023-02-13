const db = require('../models');
const { Type } = db;

const getTypes = async (req, res) => {
  const types = await Type.findAll();
  res.send(types);
}

const getType = async (req, res) => {
  const type = await Type.findOne({
    where: { id: req.params.id },
  });
  res.send(type);
}

const createType = async (req, res) => {
  const type = await Type.create(req.body);
  res.send(type);
}

const updateType = async (req, res) => {
  const type = await Type.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(type);
}

const deleteType = async (req, res) => {
  const type = await Type.destroy({
    where: { id: req.params.id },
  });
  res.send(type);
}

module.exports = {
  getTypes,
  getType,
  createType,
  updateType,
  deleteType,
};