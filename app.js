var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var app = express();
var verify = require('./routes/verifyToken');
// var dotenv = require('dotenv')

// dotenv.config()


app.use(express.static(path.join(__dirname, "client/build")));

// db
// var mongoose = require('mongoose')
// MONGODB_URL = process.env.DB_URL || 'mongodb://dbRichard:db0207@ds259089.mlab.com:59089/heroku_r6fjp5rj'
// mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('db connect')
//   // we're connected!
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use("/backend/users", authRouter);
// 需要登入才能取得資料
// app.use("/backend/", verify, indexRouter);
// app.use("/backend/", indexRouter);
app.get('/', function (req, res, next) {
  res.send('123')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
