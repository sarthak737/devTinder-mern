const mongoose = require("mongoose");

const connectionReqSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "interested", "ignored"],
        message: `{VALUE} is invalid`,
      },
      required: true,
    },
  },
  { timestamps: true }
);

connectionReqSchema.pre("save", function () {
  const connectionReq = this;
  if (connectionReq.fromUserId.equals(connectionReq.toUserId)) {
    throw new Error("Can't send request to yourself");
  }
  next();
});
const ConnectionReq = mongoose.model("ConnectionReq", connectionReqSchema);

module.exports = {
  ConnectionReq,
};
