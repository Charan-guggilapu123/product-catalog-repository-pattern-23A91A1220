const Joi = require('joi');

const createProduct = Joi.object({
  name: Joi.string().required().min(3).max(255),
  description: Joi.string().allow('', null),
  price: Joi.number().required().min(0),
  sku: Joi.string().required().min(3),
  categoryIds: Joi.array().items(Joi.string().uuid()).optional()
});

const updateProduct = Joi.object({
  name: Joi.string().min(3).max(255),
  description: Joi.string().allow('', null),
  price: Joi.number().min(0),
  sku: Joi.string().min(3),
  categoryIds: Joi.array().items(Joi.string().uuid())
}).min(1); // Ensure at least one field is being updated

const productValidation = {
  createProduct,
  updateProduct
};

module.exports = productValidation;
