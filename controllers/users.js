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
  res.send(user);
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
  await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(user);
}

const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  if (user) {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};