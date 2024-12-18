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

module.exports = {
  postABook,
  getAllBooks,
};
