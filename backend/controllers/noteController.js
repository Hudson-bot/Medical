const Note = require('../models/Note');

// Get all notes for authenticated user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { content, timestamp } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Note content is required' });
    }

    const note = new Note({
      content: content.trim(),
      timestamp,
      userId: req.user.id
    });

    await note.save();
    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const { content } = req.body;
    const noteId = req.params.id;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Note content is required' });
    }

    const note = await Note.findOne({ _id: noteId, userId: req.user.id });

    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    note.content = content.trim();
    note.timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    await note.save();

    res.json({ success: true, note });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId, userId: req.user.id });

    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};