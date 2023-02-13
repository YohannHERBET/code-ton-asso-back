const db = require('../models');
const { Developer } = db;

const getDevelopers = async (req, res) => {
  const developers = await Developer.findAll();
  res.send(developers);
}

const getDeveloper = async (req, res) => {
  const developer = await Developer.findOne({
    where: { id: req.params.id },
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
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
};