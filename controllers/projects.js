const db = require('../models');
const { Project, DeveloperProjects } = db;

const getProjects = async (req, res) => {
  const projects = await Project.findAll();
  if (!projects) {
    return res.status(404).send({ message: 'Aucun projet trouvé' });
  }
  res.json(projects);
};

const getProject = async (req, res) => {
  const project = await Project.findOne({
    where: { slug: req.params.slug },
    include: [{ all: true, nested: true }],
  });
  if (!project) {
    return res.status(404).send({ message: "Le projet n'a pas été trouvé" });
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
    return res.status(404).send({ message: "Le projet n'a pas été trouvé" });
  }
  await Project.update(req.body, { where: { id: req.params.id } });
  res.json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (project) {
    await Project.destroy({
      where: { id: req.params.id },
    });
    return res.send({ message: 'Projet supprimé' });
  }
  res.status(404).send({ message: 'Projet non trouvé' });
};

const joinProject = async (req, res) => {
  try {
    const { projectId, developerId } = req.body;
    const project = await DeveloperProjects.create({ ProjectId: projectId, DeveloperId: developerId });
    res.status(201).json(project);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).json({ message: 'bad request' });
    }
    res.status(500).json({ message: 'Erreur interne' });
  }
};

const quitProject = async (req, res) => {
  try {
    const { projectId, developerId } = req.body;
    if (!projectId && !developerId) {
      return res.status(400).json({ message: 'bad request' });
    }
    console.log('gg');
    await DeveloperProjects.destroy({ where: { ProjectId: projectId, DeveloperId: developerId } });
    res.status(201).json({ message: 'project quit' });
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).json({ message: 'bad request' });
    }
    res.status(500).json({ message: 'Erreur interne' });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  joinProject,
  quitProject,
};
