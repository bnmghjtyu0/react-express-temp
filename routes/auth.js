var express = require('express');
var router = express.Router();
var User = require('../model/User')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

// 驗證輸入的資料是否正確
const Joi = require('@hapi/joi');

const signupSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});

// 註冊
router.post('/register', async (req, res, next) => {

  // 1. 驗證輸入的資料是否正確
  const { error } = signupSchema.validate(req.body)
  if (error) return res.status(200)
    .json({
      retCode: 0,
      retMeg: error.details[0].message,
      retData: {}
    })

  // 2. email 是否存在
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(200)
    .json({
      retCode: 0,
      retMeg: 'Email already exists',
      retData: {}
    })

  // 3. password 加密
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword

  })
  try {
    const savedUser = await user.save()
    // console.log(savedUser)
    res.status(200)
      .json({
        retCode: 1,
        retMeg: '註冊成功',
      })
    res.json({ user: user_.id })
  } catch (err) {
    res.status(200)
      .json({
        retCode: 0,
        retMeg: err,
        retData: {}
      })
  }
});

// 登入
router.post('/login', async (req, res, next) => {
  const { error } = loginSchema.validate(req.body)
  if (error) return res.status(200).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(200)
    .json({
      retCode: 0,
      retMeg: 'Email is not found',
      retData: {}
    })

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(200)
    .json({
      retCode: 0,
      retMeg: 'Invalid password',
      retData: {}
    })

  // 使用 jwt 建立 token ( id + richard_secret)
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  res.header('Authorization', token)

  res.json({
    retCode: 1,
    retMeg: '登入成功',
    retData: {
      token
    }
  })
});

module.exports = router;
