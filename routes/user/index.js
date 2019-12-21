var express = require("express");
var router = express.Router();
var signinRouter = require("./signin");
var signupRouter = require("./signup");

router.use("/", signinRouter);
router.use("/", signupRouter);

module.exports = router;
