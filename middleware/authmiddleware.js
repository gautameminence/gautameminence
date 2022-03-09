const jwt = require("jsonwebtoken");

const token = async (req, res, next) => {
  try {
    const checktoken = req.headers.authorization;
    if (checktoken) {
      const bearer = checktoken.replace(/^Bearer\s+/, "");
      const tokens = jwt.verify(bearer, process.env.PRIVATE_KEY);
      req.token = tokens;
      next();
    } else {
      res.send("token not found ");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = token;
