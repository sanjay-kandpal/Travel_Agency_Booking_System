// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const Booking = require('../models/Booking');
const adminAuth = require('../middleware/adminAuth');

// Apply adminAuth middleware to all routes
router.use(adminAuth);

// Get all packages (admin view)
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    console.log('Found packages:', packages); // Debug log
    res.json({ packages }); // Wrap in packages object to match frontend expectations
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ 
      message: error.message,
      error: 'Failed to fetch packages'
    });
  }
});

// Create a new package
router.post('/packages', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a package
router.put('/packages/:id', async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a package
router.delete('/packages/:id', async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ 
      message: 'Package deleted successfully',
      deletedPackage 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (admin view)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('packageId', 'title price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/analytics', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" }
        }
      }
    ]);
    
    const popularPackages = await Booking.aggregate([
      {
        $group: {
          _id: "$packageId",
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { bookings: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "packages",
          localField: "_id",
          foreignField: "_id",
          as: "packageDetails"
        }
      }
    ]);

    res.json({
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      popularPackages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;