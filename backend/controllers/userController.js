import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.send("User not found");
  }
  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (!user) {
    return res.send("User not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.notes = req.body.notes || user.notes;

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

export { getUserById, updateUser, deleteUser };
