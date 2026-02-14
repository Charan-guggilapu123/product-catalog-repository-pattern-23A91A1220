const Joi = require('joi');

const createCategory = Joi.object({
  name: Joi.string().required().min(3).max(255),
  description: Joi.string().allow('', null)
});

const updateCategory = Joi.object({
  name: Joi.string().min(3).max(255),
  description: Joi.string().allow('', null)
}).min(1);

const categoryValidation = {
  createCategory,
  updateCategory
};

module.exports = categoryValidation;
