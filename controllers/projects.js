const db = require('../models');
const { Project } = db;

const getProjects = async (req, res) => {
  const projects = await Project.findAll();
  res.send(projects);
}

const getProject = async (req, res) => {
  const project = await Project.findOne({
    where: { id: req.params.id },
  });
  res.send(project);
}

const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.send(project);
}

const updateProject = async (req, res) => {
  const project = await Project.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(project);
}

const deleteProject = async (req, res) => {
  const project = await Project.destroy({
    where: { id: req.params.id },
  });
  res.send(project);
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};