const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactSubmissions,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const adminAuth = require('../middleware/adminAuth');

// Public route - submit contact form
router.post('/submit', submitContactForm);

// Protected admin routes
router.get('/submissions', adminAuth, getContactSubmissions);
router.get('/:id', adminAuth, getContactById);
router.patch('/:id/status', adminAuth, updateContactStatus);
router.delete('/:id', adminAuth, deleteContact);

module.exports = router;