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
  const { userId, title, description, content, file } = req.body;
  const user = await User.findById(userId);
  const newNote = await Note.create({
    user: userId,
    title,
    description,
    content: content,
    file: file,
  });
  await newNote.save();
  user.notes.push(newNote._id);
  await user.save();
  res.send(newNote._id);
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteId, title, description, content } = req.body;
  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  note.title = title;
  note.description = description;
  note.body = content;
  await note.save();
  res.send(note);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params._id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  console.log(note);
  await Note.deleteOne({ _id: req.params._id });
  res.send({ message: "Note deleted" });
});

export { getNotes, getNoteById, saveNote, updateNote, deleteNote };
