const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  getCars,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/auth.js");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);

module.exports = userRouter;
