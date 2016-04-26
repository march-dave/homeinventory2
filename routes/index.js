'use strict';

var express = require('express');
var router = express.Router();

var Grade = require('../models/grade');
var Category = require('../models/category');

//  GET /
// router.get('/', (req, res) => {
//   Grade.get((err, grades) => {
//     if(err) {
//       res.render('error', {error: err})
//     } else {
//       res.render('home', {grades: grades});
//     }
//   })
// })
router.get('/', (req, res) => {

  Category.get((err, cate) => {
    if(err) {
      res.render('error', {error: err})
    } else {
      res.render('home', {cates: cate});
    }
  })



})


module.exports = router;
