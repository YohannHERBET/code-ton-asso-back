const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');

const db = require('../models');
const { Association, User, Developer, Category, Skill } = db;

// Authentification
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sanitizedEmail = sanitizeHtml(email);

    if (!sanitizedEmail || !password) {
      return res
        .status(400)
        .json({ error: 'Veuillez remplir tous les champs.' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user)
      return res
        .status(400)
        .json({ error: 'Les identifiants sont incorrects.' });

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ error: 'Les identifiants sont incorrects.' });

    // Create and assign a token
    const userToken = {
      userId: user.id,
      email: sanitizedEmail,
      developerId: user.developer_id,
      associationId: user.association_id,
    };

    const token = jwt.sign(userToken, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).header('auth-token', token).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Création d'un compte développeur
const createDeveloperAccount = async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    description,
    type,
    work_preferences,
    level,
    skills,
    slug,
  } = req.body;

  const sanitizedEmail = sanitizeHtml(email);
  const sanitizedFirstname = sanitizeHtml(firstname);
  const sanitizedLastname = sanitizeHtml(lastname);
  const sanitizedDescription = sanitizeHtml(description);
  const sanitizedSlug = sanitizeHtml(slug);

  if (
    !sanitizedEmail ||
    !password ||
    !sanitizedFirstname ||
    !sanitizedLastname ||
    !sanitizedDescription ||
    !type ||
    !work_preferences ||
    !level ||
    !skills ||
    !sanitizedSlug
  ) {
    return res.status(400).send('Veuillez remplir tous les champs.');
  }

  const user = await User.findOne({ where: { email: sanitizedEmail } });
  if (user)
    return res
      .status(400)
      .send('Cet utilisateur existe déjà. Veuillez vous connecter.');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const developer = await Developer.create({
    type,
    work_preferences,
    level,
    slug: sanitizedSlug,
  });

  const newUser = await User.create({
    email: sanitizedEmail,
    password: hashedPassword,
    firstname: sanitizedFirstname,
    lastname: sanitizedLastname,
    description: sanitizedDescription,
    developer_id: developer.id,
  });
  console.log('new User', newUser);

  for (const skill of skills) {
    const skillInstance = await Skill.findByPk(skill);
    if (skillInstance) {
      await developer.addSkill(skillInstance);
    }
  }

  res.status(201).json(newUser);
};

// Création d'un compte association
const createAssociationAccount = async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    description,
    rna,
    association_name,
    slug,
    categories,
  } = req.body;

  const sanitizedEmail = sanitizeHtml(email);
  const sanitizedFirstname = sanitizeHtml(firstname);
  const sanitizedLastname = sanitizeHtml(lastname);
  const sanitizedDescription = sanitizeHtml(description);
  const sanitizedRna = sanitizeHtml(rna);
  const sanitizedAssociationName = sanitizeHtml(association_name);
  const sanitizedSlug = sanitizeHtml(slug);

  if (
    !sanitizedEmail ||
    !password ||
    !sanitizedFirstname ||
    !sanitizedLastname ||
    !sanitizedDescription ||
    !sanitizedRna ||
    !categories ||
    !sanitizedAssociationName ||
    !sanitizedSlug
  ) {
    return res.status(400).send('Veuillez remplir tous les champs.');
  }

  const user = await User.findOne({ where: { email: sanitizedEmail } });
  const association = await Association.findOne({
    where: { rna: sanitizedRna },
  });

  if (user)
    return res
      .status(400)
      .send('Cet utilisateur existe déjà. Veuillez vous connecter.');
  if (association)
    return res.status(400).send('Cette association existe déjà.');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newAssociation = await Association.create({
    rna: sanitizedRna,
    association_name: sanitizedAssociationName,
    slug: sanitizedSlug,
  });

  const newUser = await User.create({
    email: sanitizedEmail,
    password: hashedPassword,
    firstname: sanitizedFirstname,
    lastname: sanitizedLastname,
    description: sanitizedDescription,
    association_id: newAssociation.id,
  });

  for (const category of categories) {
    const categoryInstance = await Category.findByPk(category);
    if (categoryInstance) {
      await newAssociation.addCategory(categoryInstance);
    }
  }

  res.status(201).json(newUser);
};

module.exports = {
  login,
  createDeveloperAccount,
  createAssociationAccount,
};
