const express = require("express");
const { User } = require("../models/user");
const { validateData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateData(req);
    const { firstName, age, email, password } = req.body;
    const passHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, age, email, password: passHash });
    const savedUser = await user.save();

    const token = await savedUser.generateToken();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 360000) });

    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error!" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPassValid = await user.validatePassword(password);
    if (isPassValid) {
      const token = await user.generateToken();
      res.cookie("token", token);
      res.send(user);
    } else {
      return res.status(401).json({ message: "Wrong Password" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logout");
});

module.exports = {
  authRouter,
};
