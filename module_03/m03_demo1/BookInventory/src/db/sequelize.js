const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // or another supported database
  logging: false, // toggle based on preference
});

module.exports = sequelize;
