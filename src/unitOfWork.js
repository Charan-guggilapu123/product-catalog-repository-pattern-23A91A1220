const sequelize = require('./config/database');
const ProductRepository = require('./repositories/productRepository');
const CategoryRepository = require('./repositories/categoryRepository');

class UnitOfWork {
  constructor() {
    this.transaction = null;
    this.productRepository = ProductRepository;
    this.categoryRepository = CategoryRepository;
  }

  async begin() {
    this.transaction = await sequelize.transaction();
  }

  async commit() {
    if (this.transaction) {
      await this.transaction.commit();
      this.transaction = null;
    }
  }

  async rollback() {
    if (this.transaction) {
      await this.transaction.rollback();
      this.transaction = null;
    }
  }

  // Helper to get options with transaction
  getOptions() {
    return this.transaction ? { transaction: this.transaction } : {};
  }
}

module.exports = UnitOfWork;
