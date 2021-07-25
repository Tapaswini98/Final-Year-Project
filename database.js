const express = require("express");
const mysql = require("mysql");

const mysqlDB = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.MYSQLDATABASE,
})

module.exports = mysqlDB;