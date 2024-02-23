const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Stock = sequelize.define(
  'Stock',
  {
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Stock;
