// importing sequelize
const Sequelize=require('sequelize');

// importing the database connection managed by sequelize
const sequelize=require('../util/database');

// defining a new model
// we define the fields that our model should have
const Product=sequelize.define('product',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports= Product;