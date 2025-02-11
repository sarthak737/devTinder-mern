const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/sendReq", userAuth, async (req, res) => {
  res.send("Connection req sent by " + req.user.firstName);
});

module.exports = {
  requestRouter,
};
