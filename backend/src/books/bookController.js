const Book = require("./bookModel");

const postABook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Cover image is required!" });
    }

    // Sanitize category value to remove quotes, if any
    const category = req.body.category.replace(/^"|"$/g, "").trim(); // trim to remove leading/trailing spaces

    // Get the file path from the uploaded file
    const coverImage = req.file.path;

    // Create a new book object with the data from the request
    const newBook = new Book({
      ...req.body,
      category, // Ensure category is sanitized
      coverImage,
    });

    await newBook.save();

    res.status(200).send({
      message: "Book posted successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

// Get a single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

// Update book data
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).send({ message: "Failed to update book" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
