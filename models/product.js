const Sequelize = require('sequelize');

const sequelize = require('../helpers/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imgURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;