const app = require('./app');
const { sequelize } = require('./models');
const seed = require('./seed');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync models - using force: false to keep data, or use migrations in production
    // For this exercise, we sync automatically.
    await sequelize.sync({ alter: true });
    
    // Seed data if empty
    await seed();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
