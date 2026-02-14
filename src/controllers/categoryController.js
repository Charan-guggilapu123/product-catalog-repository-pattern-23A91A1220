const UnitOfWork = require('../unitOfWork');
const CategoryService = require('../services/categoryService');

exports.createCategory = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new CategoryService(uow);
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new CategoryService(uow);
  try {
    const category = await service.getCategory(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new CategoryService(uow);
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;
    const categories = await service.getAllCategories(skip, limit);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new CategoryService(uow);
  try {
    const category = await service.updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new CategoryService(uow);
  try {
    const success = await service.deleteCategory(req.params.id);
    if (!success) return res.status(404).json({ message: 'Category not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
