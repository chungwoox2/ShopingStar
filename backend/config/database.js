// backend/models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ShoppingMall', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = { sequelize };
