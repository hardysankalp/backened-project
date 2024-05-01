const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth'); // Authentication middleware

// Route for creating a new note
router.post('/', auth, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id, // Associate note with the logged-in user
  });
  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for getting all notes belonging to the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for updating a note
router.patch('/:id', auth, async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for deleting a note
router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;