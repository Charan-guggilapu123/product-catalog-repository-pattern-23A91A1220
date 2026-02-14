const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog Service API',
      version: '1.0.0',
      description: 'API for managing products and categories in an e-commerce platform',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number', format: 'float' },
            sku: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
            categories: {
              type: 'array',
              items: { $ref: '#/components/schemas/Category' }
            }
          },
        },
        Category: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              description: { type: 'string' }
            },
          },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs;
