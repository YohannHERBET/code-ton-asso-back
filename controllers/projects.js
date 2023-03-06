const db = require('../models');
const { Project, Feature } = db;

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
    include: ['Features'],
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

    const project = await Project.create({
      title,
      description,
      other_features,
      slug,
      type_id,
      association_id,
      release_date,
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

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
