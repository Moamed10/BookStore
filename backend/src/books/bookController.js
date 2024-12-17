const Book = require("./bookModel"); // Your Mongoose Book model

const postABook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Cover image is required!" });
    }

    // Check if category exists and sanitize if necessary
    let category = req.body.category;
    if (category) {
      category = category.replace(/^"|"$/g, "").trim(); // Remove quotes and trim spaces
    } else {
      return res.status(400).send({ message: "Category is required!" });
    }

    // Get the file path from Multer
    const coverImage = req.file.path;

    // Create a new book object
    const newBook = new Book({
      ...req.body,
      category, // Ensure category is sanitized
      coverImage,
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

module.exports = {
  postABook,
  getAllBooks,
};
