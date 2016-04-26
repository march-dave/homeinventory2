'use strict';

var db = require('../config/db');

// db.query('SELECT * from description', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

// db.query(`CREATE TABLE IF NOT EXISTS description (
//   id integer primary key auto_increment,
//   make text,
//   model text,
//   serialnumber text
// )`);

db.query(`CREATE TABLE IF NOT EXISTS description (
  id integer primary key auto_increment,
  descript text,
  val integer,
  categoryid integer
  )`);

exports.get = function(cb) {
  db.query('SELECT * FROM description', cb);
};

exports.create = function(grade, cb) {
  db.query(`INSERT INTO description (descript, val, categoryid) VALUES ('${grade.make}', '${grade.model}', '${grade.serialnumber}')`,
    (err) => {
      if(err) return cb(err);
      db.query('SELECT * FROM description WHERE ID = (SELECT MAX(ID) FROM description);', cb)
    });
};

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

exports.update = function(id, grade, cb) {
  db.query(`UPDATE description SET descript = '${grade.make}', val = '${grade.model}', categoryid = ${grade.total}  WHERE ID = '${id}'`, cb);
};

exports.removeById = function(id, cb) {
    // db.all(`DELETE FROM grade WHERE ID = '${id}'`, (err, grade) => {
    db.query(`DELETE FROM description WHERE ID = '${id}'`, (err, grade) => {
    if (err) return cb (err);

    cb(err, grade);
  });
};

// db.end();
