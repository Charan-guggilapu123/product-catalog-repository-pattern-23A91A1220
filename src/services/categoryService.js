class CategoryService {
  constructor(unitOfWork) {
    this.uow = unitOfWork;
    this.repo = unitOfWork.categoryRepository;
  }

  async getCategory(id) {
    return await this.repo.getById(id);
  }

  async getAllCategories(skip, limit) {
    return await this.repo.getAll({ skip, limit });
  }

  async createCategory(data) {
    try {
      await this.uow.begin();
      const category = await this.repo.add(data, this.uow.getOptions());
      await this.uow.commit();
      return category;
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }

  async updateCategory(id, data) {
    try {
      await this.uow.begin();
      const category = await this.repo.update(id, data, this.uow.getOptions());
      await this.uow.commit();
      return category;
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      await this.uow.begin();
      const result = await this.repo.delete(id, this.uow.getOptions());
      await this.uow.commit();
      return result;
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }
}

module.exports = CategoryService;
