const db = require('../models');
const { Skill } = db;

const getSkills = async (req, res) => {
  const skills = await Skill.findAll();
  if (!skills) return res.status(404).send('Aucune compétence trouvée.');
  res.json(skills);
}

const getSkill = async (req, res) => {
  const skill = await Skill.findOne({  where: { id: req.params.id } });
  if (!skill) return res.status(404).send('Compétence non trouvée.');
  res.json(skill);
}

const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.json(skill);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
}

const updateSkill = async (req, res) => {
  const skill = await Skill.findOne({ where: { id: req.params.id } });
  if (!skill) return res.status(404).send('Compétence non trouvée.');
  await Skill.update(req.body, { where: { id: req.params.id } });
  res.json(skill);
}

const deleteSkill = async (req, res) => {
  const skill = await Skill.findOne({ where: { id: req.params.id } });
  if (skill) {
    await Skill.destroy({ where: { id: req.params.id } });
    return res.send({ message: 'Compétence supprimée' });
  }
  res.status(404).send({ message: 'Compétence non trouvée' });
}

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};