const db = require('../models');
const { Category } = db;

const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.send(categories);
}

const getCategory = async (req, res) => {
  const category = await Category.findOne({
    where: { id: req.params.id },
  });
  res.send(category);
}

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.send(category);
}

const updateCategory = async (req, res) => {
  const category = await Category.update(req.body, {
    where: { id: req.params.id },
  });
  res.send(category);
}

const deleteCategory = async (req, res) => {
  const category = await Category.destroy({
    where: { id: req.params.id },
  });
  res.send(category);
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};