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
    await user.save();
    res.send("User added...");
  } catch (err) {
    res.status(400).send("Error!" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Account bna phele");
    }
    const isPassValid = await user.validatePassword(password);
    if (isPassValid) {
      const token = await user.generateToken();
      res.cookie("token", token);
      res.send("Logged in!");
    } else {
      res.send("Wrong Password");
    }
  } catch (err) {
    res.status(400).send("hehe error " + err);
  }
});

module.exports = {
  authRouter,
};
