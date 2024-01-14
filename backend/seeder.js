import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import notes from "./data/notes.js";
import User from "./models/userModel.js";
import Note from "./models/noteModel.js";

dotenv.config();

connectDB();
const importData = async () => {
  try {
    await User.deleteMany();
    await Note.deleteMany();

    for (const user of users) {
      const newUser = await User.create(user);

      for (const note of notes) {
        if (note.user !== user.name) continue;

        const newNote = new Note({
          ...note,
          user: newUser._id,
        });

        await newNote.save();
        newUser.notes.push(newNote);
      }

      await newUser.save();
    }

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
