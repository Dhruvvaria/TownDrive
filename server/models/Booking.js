const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookingSchema = new Schema(
  {
    car: {
      type: ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    pickUpDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
