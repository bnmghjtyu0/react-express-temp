var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

// MONGODB_URL = "mongodb://dbRichard:db0207@ds259089.mlab.com:59089/heroku_r6fjp5rj"
MONGODB_URL2 = "mongodb://dbRichard:db0207@ds139427.mlab.com:39427/heroku_dvlbzt1h"
mongoose.connect(MONGODB_URL2, { useNewUrlParser: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('1231')
  // we're connected!
});

/* GET users listing. */
router.post('/register', function (req, res, next) {
  res.send('register');
});
router.post('/login', function (req, res, next) {
  res.send('login');
});

module.exports = router;
