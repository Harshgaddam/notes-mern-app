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

const createNote = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const newNote = await Note.create({
    user: userId,
    title: "Untitled",
    description: "",
    content: "",
    file: "",
  });
  await newNote.save();
  res.json(newNote._id);
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteId, title, description, content, file } = req.body;
  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  note.title = title;
  note.description = description;
  note.content = content;
  note.file = file;
  await note.save();
  res.send(note._id);
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

export { getNotes, getNoteById, createNote, updateNote, deleteNote };
