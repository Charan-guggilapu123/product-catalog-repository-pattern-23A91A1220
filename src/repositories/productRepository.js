const { Op } = require('sequelize');
const IRepository = require('./iRepository');
const { Product, Category, sequelize } = require('../models');

class ProductRepository extends IRepository {
  async getById(id, options = {}) {
    return await Product.findByPk(id, {
      include: [{ model: Category, as: 'categories' }],
      ...options
    });
  }

  async getAll(options = {}) {
    const { skip = 0, limit = 100, ...otherOptions } = options;
    return await Product.findAll({
      offset: skip,
      limit: limit,
      include: [{ model: Category, as: 'categories' }],
      ...otherOptions
    });
  }

  async add(productData, options = {}) {
    return await Product.create(productData, options);
  }

  async update(id, productData, options = {}) {
    const [updatedRows] = await Product.update(productData, {
      where: { id },
      ...options
    });
    if (updatedRows > 0) {
      return await this.getById(id, options);
    }
    return null;
  }

  async delete(id, options = {}) {
    const deletedRows = await Product.destroy({
      where: { id },
      ...options
    });
    return deletedRows > 0;
  }

  async search(params) {
    const { q, category_id, min_price, max_price, skip = 0, limit = 10 } = params;
    const where = {};
    const include = [{ model: Category, as: 'categories' }];

    const likeOp = sequelize.options.dialect === 'postgres' ? Op.iLike : Op.like;

    if (q) {
      where[Op.or] = [
        { name: { [likeOp]: `%${q}%` } },
        { description: { [likeOp]: `%${q}%` } }
      ];
    }

    if (min_price) {
      where.price = { ...where.price || {}, [Op.gte]: min_price };
    }
    if (max_price) {
      where.price = { ...where.price || {}, [Op.lte]: max_price };
    }

    if (category_id) {
       include[0].where = { id: category_id };
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      include,
      offset: skip,
      limit: limit,
      distinct: true
    });

    return { total: count, products: rows };
  }
}

module.exports = new ProductRepository();
