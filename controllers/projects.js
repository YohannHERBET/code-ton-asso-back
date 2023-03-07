const db = require('../models');
const { Project, Feature, DeveloperProjects } = db;
const sanitizeHtml = require('sanitize-html');

const getProjects = async (req, res) => {
  const projects = await Project.findAll({
    include: Feature,
  });
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
    const { title, description, other_features, slug, type_id, association_id, release_date, features } = req.body;
    const userId = req.user.userId;
    const sanitizedTitle = sanitizeHtml(title);
    const sanitizedDescription = sanitizeHtml(description);
    const sanitizedOtherFeatures = sanitizeHtml(other_features);
    const sanitizedReleaseDate = sanitizeHtml(release_date);

    const project = await Project.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      other_features: sanitizedOtherFeatures,
      slug,
      type_id,
      association_id,
      release_date: sanitizedReleaseDate,
      userId,
    });

    for (const feature of features) {
      const featureInstance = await Feature.findByPk(feature);
      if (featureInstance) {
        await project.addFeature(featureInstance);
      }
    }

    const result = await Project.findOne({
      where: { id: project.id },
      include: Feature,
    });

    res.status(201).json({ project: result });
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).json({ error });
    }
    res.status(500).send({ message: 'Une erreur est survenue lors de la création du projet.' });
  }
};

const updateProject = async (req, res) => {
  const project = await Project.findOne({ where: { id: req.params.id } });
  if (!project) {
    return res.status(404).send({ message: "Le projet n'a pas été trouvé" });
  }
  await project.update(req.body);
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
    console.log(projectId, developerId);
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
