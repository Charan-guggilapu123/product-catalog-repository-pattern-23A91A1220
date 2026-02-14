const CategoryRepository = require('../../src/repositories/categoryRepository');
const { Category } = require('../../src/models');

jest.mock('../../src/models');

describe('CategoryRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should return a category by id', async () => {
      const mockCategory = { id: '1', name: 'Test Category' };
      Category.findByPk.mockResolvedValue(mockCategory);

      const result = await CategoryRepository.getById('1');

      expect(Category.findByPk).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCategory);
    });
  });

  describe('add', () => {
    it('should create a new category', async () => {
      const categoryData = { name: 'New Category', description: 'Desc' };
      const mockCreatedCategory = { id: '1', ...categoryData };
      Category.create.mockResolvedValue(mockCreatedCategory);

      const result = await CategoryRepository.add(categoryData);

      expect(Category.create).toHaveBeenCalledWith(categoryData, expect.any(Object));
      expect(result).toEqual(mockCreatedCategory);
    });
  });
});
