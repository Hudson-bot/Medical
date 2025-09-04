const express = require('express');
const router = express.Router();
const { 
  getMedicines, 
  getMedicineById, 
  getDiseases, 
  getCategories,
  createMedicine 
} = require('../controllers/medicineController');

// Public routes
router.get('/', getMedicines);
router.get('/diseases', getDiseases);
router.get('/categories', getCategories);
router.get('/:id', getMedicineById);

// Admin routes (protected - add auth middleware later)
router.post('/', createMedicine);

module.exports = router;