const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionReq } = require("../models/connectionReq");
const { User } = require("../models/user");
const userRouter = express.Router();

userRouter.get("/requests", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionReq = await ConnectionReq.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "age", "photoUrl"]);

    res.status(200).json({ message: "Data fetched", connectionReq });
  } catch (err) {
    return res.status(401).json({ message: "Error getting req" });
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connections = await ConnectionReq.find({
      $or: [
        { toUserId: user._id, status: "accepted" },
        { fromUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["firstName"])
      .populate("toUserId", ["firstName"]);

    const data = connections.map((d) => {
      if (d.fromUserId._id.toString() === user._id.toString()) {
        return d.toUserId;
      }
      return d.fromUserId;
    });

    res.status(201).json({ message: "All connections", data });
  } catch (error) {
    return res.status(401).json({ message: "Error connections" });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const requests = await ConnectionReq.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hiddenUsers = new Set();
    requests.forEach((r) => {
      hiddenUsers.add(r.toUserId.toString());
      hiddenUsers.add(r.fromUserId.toString());
    });

    const feedUsers = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hiddenUsers) },
        },
        {
          _id: { $ne: loggedInUser._id },
        },
      ],
    })
      .select("firstName photoUrl age")
      .skip(skip)
      .limit(limit);

    return res.status(201).json({ message: "users", feedUsers });
  } catch (err) {
    return res.status(401).json({ message: "Error feed req", err });
  }
});

module.exports = { userRouter };
