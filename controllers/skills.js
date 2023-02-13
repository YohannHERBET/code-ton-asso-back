const db = require('../models');
const { Skill } = db;

const getSkills = async (req, res) => {
  const skills = await Skill.findAll();
  res.send(skills);
}

const getSkill = async (req, res) => {
  const skill = await Skill.findOne({
    where: { id: req.params.id },
  });
  res.send(skill);
}

const createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.send(skill);
}

const updateSkill = async (req, res) => {
  const skill = await Skill.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(skill);
}

const deleteSkill = async (req, res) => {
  const skill = await Skill.destroy({
    where: { id: req.params.id },
  });
  res.send(skill);
}

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};