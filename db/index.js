var mongoose = require("mongoose");
MONGODB_URL = process.env.DB_URL;

const state = {
  db: null
};

const connect = cb => {
  if (state.db) {
    cb();
  } else {
    mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      console.log("db connect");
      // we're connected!
    });
  }
};

const getPrimaryKey = _id => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };
