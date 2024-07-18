const mysql = require('mysql2');

const conn = mysql.createConnection({
    host : "project-db-stu3.smhrd.com",
    port: 3307,
    database: "Insa5_JSA_hacksim_5",
    password: "aischool5",
    user : "Insa5_JSA_hacksim_5"
});

conn.connect();

console.log("DB연결 완료");

module.exports = conn;