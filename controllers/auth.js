const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');
const { Association, User, Developer } = db;

// Authentification
const login = async (req, res) => {
  const { email, password,} = req.body;
  if(!email || !password) {
    return res.status(400).send('Veuillez remplir tous les champs.');
  }
  // Check if user exists
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).send('Les identifiants sont incorrects.');
  
  // Check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Les identifiants sont incorrects.');

  // Create and assign a token
  const userToken = { userId: user.id, email: user.email }
  const token = jwt.sign(userToken, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  res.header('auth-token', token).json({ token });
}

// Création d'un compte développeur
const createDeveloperAccount = async (req, res) => {
  const { email, password, firstname, lastname, description, type, work_preferences, level, slug } = req.body;
  if(!email || !password || !firstname || !lastname || !description || !type || !work_preferences || !level || !slug) {
    return res.status(400).send('Veuillez remplir tous les champs.');
  }

  const user = await User.findOne({ where: { email } });
  if (user) return res.status(400).send('Cet utilisateur existe déjà. Veuillez vous connecter.');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const developer = await Developer.create({
    type,
    work_preferences,
    level,
    slug,
  });

  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    description,
    developer_id: developer.id,
  });

  res.json(newUser);
}

// Création d'un compte association
const createAssociationAccount = async (req, res) => {
  const { email, password, firstname, lastname, description, rna, association_name, slug} = req.body;
  if(!email || !password || !firstname || !lastname || !description || !rna || !association_name || !slug) {
    return res.status(400).send('Veuillez remplir tous les champs.');
  }

  const user = await User.findOne({ where: { email } });
  const association = await Association.findOne({ where: { rna } });

  if (user) return res.status(400).send('Cet utilisateur existe déjà. Veuillez vous connecter.');
  if (association) return res.status(400).send('Cette association existe déjà.');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAssociation = await Developer.create({
    rna,
    association_name,
    slug,
  });

  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    description,
    association_id: newAssociation.id,
  });

}


module.exports = {
  login,
  createDeveloperAccount,
  createAssociationAccount,
};