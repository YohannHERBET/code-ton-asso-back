const db = require('../models');
const { Category } = db;

const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  if (!categories) return res.status(404).send('Aucune catégorie trouvée.');
  res.json(categories);
}

const getCategory = async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });
  if (!category) return res.status(404).send('Catégorie non trouvée.');
  res.json(category);
}

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    if (error.name.includes('Sequelize')) {
      return res.status(400).send(error.errors.map((err) => err.message));
    }
    res.status(500).send({ message: 'Erreur interne' });
  }
}

const updateCategory = async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });
  if (!category) return res.status(404).send('Catégorie non trouvée.');
  await Category.update(req.body, { where: { id: req.params.id } });
  res.json(category);
}

const deleteCategory = async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });
  if (category) {
    await Category.destroy({
      where: { id: req.params.id },
    });
    return res.send({ message: 'Catégorie supprimée' });
  }
  res.status(404).send({ message: 'Catégorie non trouvée' });
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};