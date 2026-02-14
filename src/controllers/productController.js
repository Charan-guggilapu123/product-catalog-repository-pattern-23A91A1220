const UnitOfWork = require('../unitOfWork');
const ProductService = require('../services/productService');

// In a real app, use DI container. Here we instantiate per request or singleton.
// Since UoW is stateful (holds transaction), it must be updated or instantiated per request.
// However, my Service takes UoW in constructor.
// Better: Controller methods instantiate UoW and Service.

exports.createProduct = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new ProductService(uow);
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new ProductService(uow);
  try {
    const product = await service.getProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new ProductService(uow);
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const products = await service.getAllProducts(skip, limit);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new ProductService(uow);
  try {
    const product = await service.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    if (error.message === 'Product not found') {
       return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new ProductService(uow);
  try {
    const success = await service.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  const uow = new UnitOfWork();
  const service = new ProductService(uow);
  try {
    const { q, category_id, min_price, max_price, skip, limit } = req.query;
    const result = await service.searchProducts({
      q,
      category_id,
      min_price: min_price ? parseFloat(min_price) : undefined,
      max_price: max_price ? parseFloat(max_price) : undefined,
      skip: skip ? parseInt(skip) : 0,
      limit: limit ? parseInt(limit) : 10
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
