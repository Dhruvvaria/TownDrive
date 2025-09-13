const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes.js");
const ownerRouter = require("./routes/ownerRoutes.js");
const bookingRouter = require("./routes/bookingRoutes.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running.");
});
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// module.exports = app;
