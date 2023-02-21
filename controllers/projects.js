const db = require('../models');
const { Project } = db;

const getProjects = async (req, res) => {
  const projects = await Project.findAll();
  if (!projects) {
    return res.status(404).send({ message: 'Aucun projet trouvé' });
  }
  res.json(projects);
};

const getProject = async (req, res) => {
  console.log('req.params', req.params);
  const project = await Project.findOne({
    where: { slug: req.params.slug },
  });
  if (!project) {
    return res
      .status(404)
      .send({ message: "La fonctionnalité n'a pas été trouvée" });
  }
  res.json(project);
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
};

const updateProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (!project) {
    return res
      .status(404)
      .send({ message: "La fonctionnalité n'a pas été trouvée" });
  }
  await Project.update(req.body, { where: { id: req.params.id } });
  res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (user) {
    await Project.destroy({
      where: { id: req.params.id },
    });
    return res.send({ message: 'Projet supprimé' });
  }
  res.status(404).send({ message: 'Projet non trouvé' });
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
