import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Note from "../models/noteModel.js";
import generateToken from "../utils/generateToken.js";

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.send("User not found");
  }
  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.notes = req.body.notes || user.notes;
  if (!user) {
    return res.send("User not found");
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    notes: updatedUser.notes,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.send("User not found");
  }
  await user.deleteOne({ _id: req.params.id });
  res.json({ message: "User removed" });
});

const getUserNotes = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.send("User not found");
  }
  const notes = await Note.find({}).sort({ createdAt: -1 }).exec();
  let result = [];
  for (const note of notes) {
    if (note.user.toString() !== userId) continue;
    result.push(note);
  }
  res.send(result);
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const removeNote = asyncHandler(async (req, res) => {
  const { userId, noteId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.notes.pull(noteId);
  await user.save();
  res.send({ message: "Note removed" });
});

export {
  getUserById,
  updateUser,
  deleteUser,
  getUserNotes,
  authUser,
  logoutUser,
  registerUser,
  removeNote,
};
