const express = require("express");
const addAddress = require("../controller/addressController");
const token = require("../middleware/authmiddleware");

const route = express.Router();

route.post("/address", token, addAddress);

module.exports = route;
