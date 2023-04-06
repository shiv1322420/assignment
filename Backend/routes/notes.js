const express = require('express');
const router = express.Router();
const {createNotesValidation, updateNotesValidation, deleteNotesValidation,getAllNotesValidation,getNotesValidation}=require('../validation/notes')
const {
  createNotes,
  getAllnotes,
  getNotesById,
  updateNote,
  deleteNote,
} = require('../controller/notes');


router.get('/notes',getAllNotesValidation,getAllnotes);

router.get('/notes/:id',getNotesValidation ,getNotesById);

router.post('/notes',createNotesValidation ,createNotes);

router.put('/notes/:id',updateNotesValidation ,updateNote);

router.delete('/notes/:id',deleteNotesValidation ,deleteNote);

module.exports = router;