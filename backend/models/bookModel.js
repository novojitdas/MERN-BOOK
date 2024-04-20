import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", BookSchema);
