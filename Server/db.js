const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'gtxm1146.siteground.biz',
    user: 'usaltug5hnlhz',
    password: 'MGP123.*',
    database: 'dbsfg8ljr0hvir',
    waitForConnections: true,
    queueLimit: 0,
    acquireTimeout: 10000, // Tiempo en milisegundos para esperar una conexión
    connectTimeout: 10000 // Tiempo en milisegundos para la conexión inicial
});

pool.on('connection', (connection) => {
    console.log('Nueva conexión establecida con ID: ' + connection.threadId);
});

pool.on('error', (err) => {
    console.error('Error en el pool de conexiones: ', err);
});

module.exports = pool;
