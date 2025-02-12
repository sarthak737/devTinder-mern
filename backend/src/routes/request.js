const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { ConnectionReq } = require("../models/connectionReq.js");

// requestRouter.post("/sendReq", userAuth, async (req, res) => {
//   res.send("Connection req sent by " + req.user.firstName);
// });

requestRouter.post("/send/:status/:userID", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user;
    const toUserId = req.params.userID;
    const status = req.params.status;

    const connection = new ConnectionReq({ fromUserId, toUserId, status });
    const data = await connection.save();
    res.send(`Req sent! ${data}`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = {
  requestRouter,
};
