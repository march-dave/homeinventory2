'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'q6w1bky95fz8nh2p',
  password : 'tow14ccx0eb9dzsg',
  database : 'kitefin'
});

connection.connect();

module.exports = connection;
