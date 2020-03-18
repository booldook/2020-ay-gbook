require('dotenv').config();
const mysql = require('mysql2/promise');
const connect = mysql.createPool({
	host: "localhost",
	port: 3306,
	database: process.env.DB,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectionLimit: 10,
	waitForConnections: true
});

module.exports = connect;