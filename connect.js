const mysql = require('mysql2');
// require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'VHQsFQRPt4EUKvHJA3Kf',
    database: 'employee_manager_db'
});

module.exports = db;