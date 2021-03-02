const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'my_merch',
    password: 'rootroot'
});

module.exports = pool.promise();
