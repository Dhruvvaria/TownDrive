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

// Configure CORS properly for production
const corsOptions = {
  origin: [
    "http://localhost:3000", // For local development
    "http://localhost:5173", // For Vite dev server
    "https://town-drive.vercel.app", // Your production frontend URL
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));
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
