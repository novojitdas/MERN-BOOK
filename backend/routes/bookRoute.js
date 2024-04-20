import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Post Route
// Save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publish year.",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get Route
// Route for Get all books
router.get("/", async (req, res) => {
  try {
    const allbooks = await Book.find({});
    return res.status(200).json({
      count: allbooks.length,
      data: allbooks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get Route
// Get a book from database using id
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  return res.status(200).json(book);
});

// Update Route
// update book using id
// we need to get the id using req.params and update it using req.body
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "send all the required fields: title, author, publishYear",
      });
    } else {
      const updateBookQuery = await Book.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (!updateBookQuery) {
        return res.status(404).send({ message: "book not found" });
      }

      return res.status(200).send({ message: "Book updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete route
// delete a book from the database
router.delete("/:id", async (req, res) => {
  try {
    const deleteBookQuery = await Book.findByIdAndDelete(req.params.id);

    if (!deleteBookQuery) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
