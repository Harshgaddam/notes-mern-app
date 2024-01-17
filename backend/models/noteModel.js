import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: false,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
