import asyncHandler from "../middleware/asyncHandler.js";
import Note from "../models/noteModel.js";

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({});
  res.send(notes);
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.send(note);
});

export { getNotes, getNoteById };
