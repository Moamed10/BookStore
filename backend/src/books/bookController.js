const Book = require("./bookModel"); // Your Mongoose Book model

const postABook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Cover image is required!" });
    }

    // Ensure that we have all the necessary fields
    const {
      title,
      description,
      category,
      trending,
      oldPrice,
      newPrice,
      authorId,
    } = req.body;

    // Validate all required fields
    if (
      !title ||
      !description ||
      !category ||
      !authorId ||
      !oldPrice ||
      !newPrice
    ) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    // Get the file path from Multer
    const coverImage = req.file.path;

    // Create a new book object
    const newBook = new Book({
      title,
      description,
      category,
      trending: trending === "on", // If it's a checkbox, "on" is sent for checked
      oldPrice,
      newPrice,
      coverImage,
      authorId,
    });

    // Save the book to the database
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

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).send({ message: "Book ID is required!" });
    }

    // Find and delete the book
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found!" });
    }

    res
      .status(200)
      .send({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure ID is provided
    if (!id) {
      return res.status(400).send({ message: "Book ID is required!" });
    }

    const {
      title,
      description,
      category,
      trending,
      oldPrice,
      newPrice,
      authorId,
    } = req.body;

    // Validate all required fields
    if (
      !title ||
      !description ||
      !category ||
      !authorId ||
      !oldPrice ||
      !newPrice
    ) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    // If there's a file update (coverImage), include it
    let updatedBook = {
      title,
      description,
      category,
      trending: trending === "on",
      oldPrice,
      newPrice,
      authorId,
    };

    if (req.file) {
      updatedBook.coverImage = req.file.path;
    }

    // Update the book in the database
    const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    res.status(200).send({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ message: "Failed to update book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  deleteBook,
  updateBook,
};
