const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/models');

describe('Product Catalog API Integration Tests', () => {
  beforeAll(async () => {
    // Sync database (creates tables in sqlite memory)
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Categories API', () => {
    let categoryId;

    it('should create a new category', async () => {
      const res = await request(app)
        .post('/categories')
        .send({
          name: 'Integration Test Category',
          description: 'Testing category'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual('Integration Test Category');
      categoryId = res.body.id;
    });

    it('should get all categories', async () => {
      const res = await request(app).get('/categories');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a category by id', async () => {
        const res = await request(app).get(`/categories/${categoryId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(categoryId);
    });
  });

  describe('Products API', () => {
    let categoryId;
    let productId;

    beforeAll(async () => {
        const res = await request(app)
        .post('/categories')
        .send({
          name: 'Product Test Category',
          description: 'For products'
        });
        categoryId = res.body.id;
    });

    it('should create a new product', async () => {
      const res = await request(app)
        .post('/products')
        .send({
          name: 'Integration Product',
          description: 'A product for testing',
          price: 99.99,
          sku: 'INT-001',
          categoryIds: [categoryId]
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.sku).toEqual('INT-001');
      // Basic check if categories are linked (might depend on return structure)
    });

    it('should get all products', async () => {
      const res = await request(app).get('/products');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should search products', async () => {
        // Create another product to ensure search works
        await request(app)
        .post('/products')
        .send({
          name: 'Searchable Item',
          description: 'Find me',
          price: 50.00,
          sku: 'INT-002',
          categoryIds: [categoryId]
        });

        const res = await request(app)
            .get('/products/search')
            .query({ q: 'Searchable' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.products).toHaveLength(1);
        expect(res.body.products[0].name).toEqual('Searchable Item');
    });
  });
});
