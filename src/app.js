const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

module.exports = app;
