import asyncHandler from "../middleware/asyncHandler.js";
import Note from "../models/noteModel.js";

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({});
  res.send(notes);
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.send(note);
});

export { getNotes, getNoteById };
