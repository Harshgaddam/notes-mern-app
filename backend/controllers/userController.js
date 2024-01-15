import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Note from "../models/noteModel.js";
import generateToken from "../utils/generateToken.js";
import { getNoteById, getNotes } from "./noteController.js";

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

  console.log(user);
  if (!user) {
    return res.send("User not found");
  }

  const updatedUser = await user.save();

  console.log(updatedUser);
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    notes: updatedUser.notes,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
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
  const notes = await Note.find({});
  let result = [];
  for (const note of notes) {
    console.log(note.user, userId);
    if (note.user.toString() !== userId) continue;
    result.push(note);
  }
  res.send(result);
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
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

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export {
  getUserById,
  updateUser,
  deleteUser,
  getUserNotes,
  authUser,
  logoutUser,
};
