class ProductService {
  constructor(unitOfWork) {
    this.uow = unitOfWork;
    this.repo = unitOfWork.productRepository;
  }

  async getProduct(id) {
    return await this.repo.getById(id);
  }

  async getAllProducts(skip, limit) {
    return await this.repo.getAll({ skip, limit });
  }

  async createProduct(data) {
    try {
      await this.uow.begin();
      const { categoryIds, ...productData } = data;
      const product = await this.repo.add(productData, this.uow.getOptions());
      
      if (categoryIds && categoryIds.length > 0) {
        // We need to fetch instances or just set IDs if possible.
        // Sequelize `setCategories` expects instances or IDs. IDs usually work.
        await product.setCategories(categoryIds, this.uow.getOptions());
        // Refetch to include categories in return
        const createdProduct = await this.repo.getById(product.id, this.uow.getOptions());
        await this.uow.commit();
        return createdProduct;
      }
      
      await this.uow.commit();
      return product;
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }

  async updateProduct(id, data) {
    try {
      await this.uow.begin();
      const { categoryIds, ...productData } = data;
      
      let product = await this.repo.update(id, productData, this.uow.getOptions());
      
      if (!product) {
        throw new Error('Product not found');
      }

      if (categoryIds !== undefined) { // allow empty array to clear categories
         // We need to fetch the instance again if 'update' didn't return a full instance with association methods bound in the right context? 
         // Actually `repo.update` returns the object from `getById` so it should be fine? 
         // `getById` returns a Sequelize instance.
         
         // Wait, `repo.update` calls `getById` which returns an instance.
         // BUT `getById` includes 'categories'. Does `setCategories` exist on it? Yes.
         const productInstance = await this.repo.getById(id, this.uow.getOptions());
         await productInstance.setCategories(categoryIds, this.uow.getOptions());
         product = await this.repo.getById(id, this.uow.getOptions());
      }
      
      await this.uow.commit();
      return product;
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }

  async deleteProduct(id) {
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

  async searchProducts(params) {
    // Search usually doesn't need a transaction unless we need consistent read view, but mostly read-only.
    return await this.repo.search(params);
  }
}

module.exports = ProductService;
