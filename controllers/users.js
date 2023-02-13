const db = require('../models');
const { User } = db;

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
}

const getUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  res.send(user);
}

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch(error) {
    console.log(error);
    res.send('Error');
  }
}

const updateUser = async (req, res) => {
  const user = await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(user);
}

const deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: { id: req.params.id },
  });
  res.send(user);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};