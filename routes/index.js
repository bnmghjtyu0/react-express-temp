var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/demo', function (req, res, next) {
  res.status(200).json({ title: 'Welcome use express + react platform.' });
});

module.exports = router;
