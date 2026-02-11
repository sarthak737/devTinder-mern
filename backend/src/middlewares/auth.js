const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Token not found");
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decode;

    if (!_id) {
      res.status(400).send("Token not found");
    }

    const loggedInUser = await User.findById(_id);
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
    }
    req.user = loggedInUser;
    next();
  } catch (error) {
    res.status(404, "Unauthorized ", error);
  }
};
module.exports = { userAuth };
