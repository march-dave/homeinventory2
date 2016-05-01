'use strict';

var db = require('../config/db');

// CREATE TABLE IF NOT EXISTS category (
//   id integer primary key auto_increment,
//   room text
// );
// INSERT INTO category (room) VALUES ('Kitchen');
// INSERT INTO category (room) VALUES ('Bedroom');
// INSERT INTO category (room) VALUES ('Livingroom');

db.query(`CREATE TABLE IF NOT EXISTS category (
  id integer primary key auto_increment,
  room text
);`);

exports.get = function(cb) {
  db.query('SELECT * FROM category', cb);
};

// db.query(`CREATE TABLE IF NOT EXISTS description (
//   id integer primary key auto_increment,
//   descript text,
//   val integer,
//   categoryid integer
//   )`);
//
// exports.get = function(cb) {
//   db.query('SELECT * FROM description', cb);
// };

// exports.create = function(grade, cb) {
//   db.query(`INSERT INTO description (descript, val, categoryid) VALUES ('${grade.make}', '${grade.model}', '${grade.serialnumber}')`,
//     (err) => {
//       if(err) return cb(err);
//       db.query('SELECT * FROM description WHERE ID = (SELECT MAX(ID) FROM description);', cb)
//     });
// };

exports.findAll = function(cb) {
  db.query('SELECT * FROM description', function(err, grade) {
    cb(err, grade);
  });
};

exports.findById = function(id, cb) {
  db.query(`SELECT * FROM description WHERE ID = '${id}'`, function(err, grade) {
    cb(err, grade);
  });
};
