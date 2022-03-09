const address = require("../models/adressSchema");

const addAddress = async (req, res) => {
  try {
    const id = req.token.id;
    console.log(id);
    const data = await address.create({ ...req.body, userid: id });
    if (data) {
      res.status(200).send("addess register");
    } else {
      res.status(400).send("error in saving");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = addAddress;
