const ProductRepository = require('../../src/repositories/productRepository');
const { Product, Category } = require('../../src/models');

jest.mock('../../src/models');

describe('ProductRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should return a product by id', async () => {
      const mockProduct = { id: '1', name: 'Test Product' };
      Product.findByPk.mockResolvedValue(mockProduct);

      const result = await ProductRepository.getById('1');

      expect(Product.findByPk).toHaveBeenCalledWith('1', expect.objectContaining({
        include: expect.any(Array)
      }));
      expect(result).toEqual(mockProduct);
    });
  });

  describe('add', () => {
    it('should create a new product', async () => {
      const productData = { name: 'New Product', price: 100 };
      const mockCreatedProduct = { id: '1', ...productData };
      Product.create.mockResolvedValue(mockCreatedProduct);

      const result = await ProductRepository.add(productData);

      expect(Product.create).toHaveBeenCalledWith(productData, expect.any(Object));
      expect(result).toEqual(mockCreatedProduct);
    });
  });
});
