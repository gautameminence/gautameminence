const express = require("express");
var cors = require("cors");
const { register } = require("./controller/userController");
const data = require("./dataBase/conn");
var bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/my-upload", express.static(__dirname + "/my-upload"));

// parse application/json
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("hello");
});
app.use("/user", require("./route/userRoute"));
app.use("/user", require("./route/addressRoute"));

app.listen(5000, () => {
  console.log("5000 server");
});
