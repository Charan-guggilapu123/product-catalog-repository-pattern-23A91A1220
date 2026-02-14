const sequelize = require('../config/database');
const Product = require('./product');
const Category = require('./category');

// Many-to-Many relationship
Product.belongsToMany(Category, { through: 'product_categories', foreignKey: 'product_id', otherKey: 'category_id', as: 'categories' });
Category.belongsToMany(Product, { through: 'product_categories', foreignKey: 'category_id', otherKey: 'product_id', as: 'products' });

module.exports = {
  sequelize,
  Product,
  Category,
};
