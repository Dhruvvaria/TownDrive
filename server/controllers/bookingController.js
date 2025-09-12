const Booking = require("../models/Booking.js");
const Car = require("../models/Car.js");

const checkAvailability = async (car, pickUpDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickUpDate: { $lte: returnDate },
    returnDate: { $gte: pickUpDate },
  });
  return bookings.length === 0;
};

module.exports.checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickUpDate, returnDate } = req.body;

    const cars = await Car.find({ location, isAvailiable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickUpDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

module.exports.createBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickUpDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickUpDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not Available" });
    }

    const carData = await Car.findById(car);

    const picked = new Date(pickUpDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickUpDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: "Booking Created" });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

module.exports.getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

module.exports.getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};

module.exports.changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (e) {
    console.log(e.message);
    res.json({ success: false, message: e.message });
  }
};
