const db = require('../models');
const { User } = db;

const getUsers = async (req, res) => {
  const users = await User.findAll();
  if (!users) {
    return res.status(404).send({ message: 'La DB a dû sauter ¯\_(ツ)_/¯' });
  }
  res.json(users);
}

const getUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id }, });
  if (!user) {
    return res.status(404).send({ message: 'L\'utilisateur n\'a pas été trouvé' });
  }
  res.json(user);
}

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch(error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
}

const updateUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(404).send({ message: 'L\'utilisateur n\'a pas été trouvé' });
  }
  const updatedUser = await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedUser);

}

const deleteUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (user) {
    await User.destroy({
      where: { id: req.params.id },
    });
    return res.send({ message: 'Utilisateur supprimé' });
  }
  res.status(404).send({ message: 'Utilisateur non trouvé' });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};