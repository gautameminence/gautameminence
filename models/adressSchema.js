const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
  },
  housenumber: {
    type: String,
  },
  colony: {
    type: String,
  },
  nearby: {
    type: String,
  },
});

const useradress = mongoose.model("adress", addressSchema);

module.exports = useradress;
