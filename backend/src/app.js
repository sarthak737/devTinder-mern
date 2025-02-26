const express = require("express");
const app = new express();
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/request.js");
const { userRouter } = require("./routes/user.js");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", profileRouter);
app.use("/request", requestRouter);
app.use("/profile", profileRouter);
app.use("/user", userRouter);
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.send("huehue error");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userID = req.body.userID;
//   try {
//     const user = await User.findByIdAndDelete(userID);
//     res.send("hogya delete");
//   } catch (err) {
//     console.log("Error delete");
//   }
// });

// app.patch("/user/:userID", async (req, res) => {
//   const userID = req.params?.userID;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = [
//       "firstName",
//       "lastName",
//       "password",
//       "gender",
//       "photoUrl",
//       "about",
//       "skills",
//     ];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Can't Update");
//     }
//     await User.findByIdAndUpdate({ _id: userID }, data, {
//       runValidators: true,
//     });
//     res.send("Updated/Patched");
//   } catch (err) {
//     res.status(401).send("Error Patch " + err.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("DB connected...");
    app.listen(6666, () => {
      console.log("Listening to 6666....");
    });
  })
  .catch((err) => {
    console.log("Error...");
  });
