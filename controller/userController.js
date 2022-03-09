// const user = require("../models/userSchema");
const email = require("../helper/nodemailer");
const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");
const { aggregate } = require("../models/userSchema");
const { errorMonitor } = require("nodemailer/lib/xoauth2");
require("dotenv").config();
const register = async (req, res) => {
  try {
    console.log(req.file);
    const data = await users.create({ ...req.body, picture: req.file.path });

    if (data) {
      email(req.body.email);
      return res.status(200).send("register");
    } else {
      return res.status(400).send("not register");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const data = await users.findOne({ email: req.body.email });
    if (data) {
      const pass = await users.findOne({ password: data.password });
      if (pass) {
        var token = jwt.sign({ id: data.id }, process.env.PRIVATE_KEY);
        console.log(token);
        return res.status(200).send({ message: "user login", token: token });
      } else {
        return res.status(404).send("password not match");
      }
    } else {
      return res.status(404).send("email wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req, res) => {
  try {
    //const userid = req.token.id;
    //console.log(userid);

    //const data = await users.findOne({ _id: id });
    const data = await users.aggregate([
      // { $match: { housenumber: 322 } },
      {
        $lookup: {
          from: "adresses",
          localField: "_id",
          foreignField: "userid",
          as: "user",
          // let: { id: "userid" },
          //$and: [{ $eq: ["$studentId", "$$resId"] }],
          //pipeline: [{ $match: { $expr: { $in: ["$_id", "$$id"] } } }],
          //localField: "_id",
          //foreignField: "userid",
          //: "users",
        },
      },

      { $unwind: "$user" },
    ]);
    console.log(data);
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const reg = async (req, res) => {
  try {
    //console.log(req.file);
    const data = await users.create(req.body);

    if (data) {
      //email(req.body.email);
      return res.status(200).send("register");
    } else {
      return res.status(400).send("not register");
    }
  } catch (error) {
    console.log(error);
  }
};

const pro = async (req, res) => {
  try {
    const userid = req.token.id;
    //console.log(userid);

    const data = await users.findOne({ _id: userid });
    if (data) {
      res.status(200).send(data);
    } else {
      res.send("not match");
    }
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const userid = req.token.id;

    const query = await users.updateOne({ _id: userid }, req.body);
    return res.status(200).send({ query, msg: "update" });
  } catch (error) {
    console.log(error);
  }
};

const userlist = async (req, res) => {
  const { currentPage, limit } = req.params;
  const { search } = req.query;
  // console.log(finduser, "******");
  //const page=req.params.page
  const numbers = await users.count();
  try {
    const data = await users
      .find({ $or: [{ username: { $regex: String(search), $options: "i" } }] })
      .limit(limit)
      .skip((currentPage - 1) * 2);
    //console.log(limit);
    //console.log(currentPage, "((((((((");
    res.send({ data, totalCount: numbers });
  } catch (error) {
    console.log(error);
  }
};

const up = async (req, res) => {
  try {
    console.log(req.file);
    const userid = req.params.id;
    const data = await users.updateOne(
      { _id: userid },
      { ...req.body, picture: req.file.path }
    );
    return res.status(200).send({ data, msg: "updated" });
  } catch (error) {
    console.log(error);
  }
};

const userDelete = async (req, res) => {
  try {
    const userid = req.params.id;
    const data = await users.deleteOne({ _id: userid });
    return res.status(200).send({ data, msg: "delete" });
  } catch (error) {
    console.log(error);
  }
};

const search = async (req, res) => {
  //onst { page } = req.params;
  const { finduser } = req.params;
  //const page=req.params.page
  //const numbers = await users.count();
  try {
    const data = await users.find({
      $or: [{ username: { $regex: String(finduser), $options: "i" } }],
    });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userDelete,
  register,
  login,
  profile,
  reg,
  pro,
  update,
  userlist,
  up,
};
