const { Sequelize } = require('sequelize');
require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize(isTest ? 'sqlite::memory:' : (process.env.DATABASE_URL || 'postgres://user:password@db:5432/product_catalog'), {
  dialect: isTest ? 'sqlite' : 'postgres',
  logging: false,
});

module.exports = sequelize;
