const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { ConnectionReq } = require("../models/connectionReq.js");
const { User } = require("../models/user.js");

// requestRouter.post("/sendReq", userAuth, async (req, res) => {
//   res.send("Connection req sent by " + req.user.firstName);
// });

requestRouter.post("/send/:status/:userID", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user;
    const toUserId = req.params.userID;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    const isAllowedStatus = allowedStatus.includes(status);
    if (!isAllowedStatus) {
      return res.status(401).send("Invalid connection request");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingReq = await ConnectionReq.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingReq) {
      return res.status(401).json({ message: "Req exists" });
    }

    const connection = new ConnectionReq({ fromUserId, toUserId, status });
    const data = await connection.save();
    res.json({
      message: req.user.firstname + status + " in " + toUser.firstName,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = {
  requestRouter,
};
