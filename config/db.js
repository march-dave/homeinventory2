'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection(process.env.JASWDB_URL ||{
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'testdb'
});

connection.connect();

module.exports = connection;
