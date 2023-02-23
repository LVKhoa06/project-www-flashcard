import mysql from "mysql2/promise";

const CONST_SSL_OPTIONS = process.env.NODE_ENV === 'development' ? false : true;

const CONST_CONFIG = {
    connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    ssl: {
        rejectUnauthorized: CONST_SSL_OPTIONS
    }
}; // CONST_CONFIG


let poolInstance;

module.exports = function pool() {
    if (poolInstance)
        return poolInstance;

    poolInstance = mysql.createPool(CONST_CONFIG);

    return poolInstance;
}; // pool