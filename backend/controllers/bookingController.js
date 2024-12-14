
// controllers/bookingController.js
const Booking = require('../models/Booking');
const Package = require('../models/Package');

exports.createBooking = async (req, res) => {
  try {
    const { packageId, numberOfTravelers } = req.body;
    
    // Fetch package to calculate total price
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const totalPrice = package.price * numberOfTravelers;
    
    const newBooking = new Booking({
      ...req.body,
      totalPrice
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('packageId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
