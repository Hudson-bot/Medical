const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

// Get all notes for authenticated user
router.get('/', auth, getNotes);

// Create a new note
router.post('/', auth, createNote);

// Update a note
router.put('/:id', auth, updateNote);

// Delete a note
router.delete('/:id', auth, deleteNote);

module.exports = router;