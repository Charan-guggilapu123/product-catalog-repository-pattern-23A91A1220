const IRepository = require('./iRepository');
const { Category } = require('../models');

class CategoryRepository extends IRepository {
  async getById(id) {
    return await Category.findByPk(id);
  }

  async getAll(options = {}) {
    // Basic implementation for skip/limit if needed, though categories often just "get all"
    const { skip = 0, limit = 100 } = options;
    return await Category.findAll({
      offset: skip,
      limit: limit
    });
  }

  async add(categoryData, options = {}) {
    return await Category.create(categoryData, options);
  }

  async update(id, categoryData, options = {}) {
    const [updatedRows] = await Category.update(categoryData, {
      where: { id },
      ...options
    });
    if (updatedRows > 0) {
      return await this.getById(id, options);
    }
    return null;
  }

  async delete(id, options = {}) {
    const deletedRows = await Category.destroy({
      where: { id },
      ...options
    });
    return deletedRows > 0;
  }
}

module.exports = new CategoryRepository();
