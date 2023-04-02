const Sequelize=require('sequelize');

// the first parameter is the name of database, second is the username and third is the password
const sequelize=new Sequelize('node-complete','root','root',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;