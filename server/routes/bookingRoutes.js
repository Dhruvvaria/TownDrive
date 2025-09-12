const express = require("express");
const {
  checkAvailabilityOfCar,
  createBookings,
  getUserBookings,
  getOwnerBookings,
  changeBookingStatus,
} = require("../controllers/bookingController.js");
const { protect } = require("../middleware/auth.js");

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityOfCar);
bookingRouter.post("/create", protect, createBookings);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

module.exports = bookingRouter;
