
// routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);

// Admin routes
router.post('/', adminAuth, packageController.createPackage);
router.put('/:id', adminAuth, packageController.updatePackage);
router.delete('/:id', adminAuth, packageController.deletePackage);

module.exports = router;
