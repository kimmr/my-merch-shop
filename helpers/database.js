/*
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'my_merch',
    password: 'rootroot'
});

module.exports = pool.promise();
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_merch', 'root', 'rootroot', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;


