import asyncHandler from "../middleware/asyncHandler.js";
import Note from "../models/noteModel.js";
import User from "../models/userModel.js";

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

const saveNote = asyncHandler(async (req, res) => {
  console.log(req);
  const userId = req.body.userId;
  const user = await User.findById(userId);
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const newNote = await Note.create({
    user: userId,
    title,
    description,
    content,
  });
  await newNote.save();
  user.notes.push(newNote._id);
  await user.save();
  res.send(newNote);
});

export { getNotes, getNoteById, saveNote };
