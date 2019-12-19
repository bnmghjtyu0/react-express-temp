var express = require('express');
var router = express.Router();
var User = require('../model/User')


/* GET users listing. */
router.post('/register', async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password

  })
  try {
    const saveUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
});
router.post('/login', function (req, res, next) {
  res.send('login');
});

module.exports = router;
