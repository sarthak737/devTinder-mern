const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
  // try {
  //   const { token } = req.cookies;
  //   if (!token) {
  //     throw new Error("Token not found");
  //   }
  //   const decodeToken = await jwt.verify(token, "sarthak");
  //   const { _id } = decodeToken;
  //   const loggedInUser = await User.findById(_id);
  //   if (!loggedInUser) {
  //     throw new Error("User not found");
  //   }
  //   res.send(loggedInUser);
  // } catch (error) {
  //   throw new Error("Invalid token things");
  // }
  try {
    const user = req.user;
    if (user) {
      res.send(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.send("error :" + err);
  }
});

module.exports = {
  profileRouter,
};
