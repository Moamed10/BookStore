const express = require("express");
const upload = require("../../config/upload"); // Multer configuration
const { postABook, getAllBooks, deleteBook } = require("./bookController"); // Controller methods

const router = express.Router();

// Route to create a new book with cover image
router.post("/create-book", upload.single("coverImage"), postABook);

// Route to get all books
router.get("/all-books", getAllBooks);
router.delete("/books/:id", deleteBook);
module.exports = router;
