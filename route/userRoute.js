const express = require("express");
const {
  register,
  login,
  profile,
  reg,
  pro,
  update,
  userlist,
  up,
  userDelete,
  search,
} = require("../controller/userController");
const token = require("../middleware/authmiddleware");
//const users = require("../models/userSchema");
//const multer = require("multer");
const upload = require("../middleware/multer");
//const upload = multer({ dest: "uploads/" });
const route = express.Router();

route.post("/register", upload.single("picture"), register);
route.post("/login", login);
route.get("/list", token, profile);
route.post("/adduser", reg);
route.get("/profile", token, pro);
route.put("/update", token, update);
route.get("/userlist/:currentPage/:limit", userlist);
//route.get("/find/:finduser", search);
route.put("/updateuser/:id", upload.single("picture"), up);
route.delete("/deleteuser/:id", userDelete);
module.exports = route;
