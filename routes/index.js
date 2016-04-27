'use strict';

var express = require('express');
var router = express.Router();

var Grade = require('../models/grade');
var Category = require('../models/category');

//  GET /
router.get('/', (req, res) => {
  Grade.get((err, grades) => {
    if(err) {
      res.render('error', {error: err})
    } else {
      res.render('home', {grades: grades});
    }
  })
})

// router.get('/', (req, res) => {
//   Category.get((err, cates) => {
//     if(err) {
//       res.render('error', {error: err})
//     } else {
//       // res.render('home', {cates: cates2});
//       res.render('home', {cates: cates});
//     }
//   })
// })


module.exports = router;
