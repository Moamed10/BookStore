const express = require("express");
const upload = require("../../config/upload"); // Multer configuration
const { postABook, getAllBooks } = require("./bookController"); // Controller that handles book creation

const router = express.Router();

// This is your POST route for creating a new book with an image
router.post("/create-book", upload.single("coverImage"), postABook);
router.get("/all-books", getAllBooks);

module.exports = router;
