const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myapp");
var dataBase = mongoose.connection;

dataBase.on("connected", function () {
  console.log("succesfull connected");
});
dataBase.on("error", function (err) {
  console.log("not connected" + err);
});

module.exports = dataBase;
