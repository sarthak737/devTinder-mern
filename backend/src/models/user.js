const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    age: { type: Number, required: true, min: 18 },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: { type: String, required: true, minLength: 8 },
    // gender: {
    //   type: String,
    //   validate(value) {
    //     if (!["male", "female", "others"].includes(value)) {
    //       throw new Error(" Invalid gender");
    //     }
    //   },
    // },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is invalid gender`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.djibstyle.com/wp-content/uploads/2019/01/dummy-snapcode-avatar@2x-2.png",
    },
    about: { type: String, default: "Hello dumb" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ _id: this._id }, "sarthak", {
    expiresIn: "1hr",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const isPasswordCorrect = bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
