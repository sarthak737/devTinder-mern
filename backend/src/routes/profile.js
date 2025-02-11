const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditItems } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

profileRouter.get("/view", userAuth, async (req, res) => {
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

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    validateEditItems(req);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(loggedInUser);
  } catch (err) {
    console.log("Error ", err);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  let { password } = loggedInUser;
  let newPassword = req.body.password;

  newPassword = await bcrypt.hash(newPassword, 10);

  loggedInUser.password = newPassword;

  await loggedInUser.save();

  res.send("Password updated");
});

module.exports = {
  profileRouter,
};
