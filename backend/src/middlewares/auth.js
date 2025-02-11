const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(400).send("Token not found");
      throw new Error("Invalid token");
    }
    const decode = await jwt.verify(token, "sarthak");
    const { _id } = decode;

    if (!_id) {
      res.status(400).send("Token not found");
    }

    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) {
      throw new Error("User not found");
    }
    req.user = loggedInUser;
    next();
  } catch (error) {
    res.status(404, "Unauthorized ", error);
  }
};
module.exports = { userAuth };
