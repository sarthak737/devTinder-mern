const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { ConnectionReq } = require("../models/connectionReq.js");
const { User } = require("../models/user.js");
const { connection } = require("mongoose");

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
      message: req.user.firstName + " " + status + " in " + toUser.firstName,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

requestRouter.post("/review/:status/:reqID", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const { reqID, status } = req.params;
  try {
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(401).json({ message: "Error status request" });
    }

    const isReqValid = await ConnectionReq.findOne({
      _id: reqID,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!isReqValid) {
      return res.status(404).json({ message: "Req not found" });
    }
    isReqValid.status = status;
    const data = await isReqValid.save();
    return res.status(200).json({ message: "Req " + status, data });
  } catch (err) {
    res.status(401).send(`Error review: ${err} `);
  }
});

module.exports = {
  requestRouter,
};
