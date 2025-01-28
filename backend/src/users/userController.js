const bcrypt = require("bcrypt");
const User = require("./userModel");
const Book = require("../books/bookModel"); // Assuming you have a Book model

const jwt = require("jsonwebtoken");

// Sign up user
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await user.save();

    // Return success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Both email and password are required." });
    }

    // Find user in the database, populate the boughtBooks field
    const user = await User.findOne({ email }).populate("boughtBooks");
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    // Compare the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || "yourSecretKeyHere", // Make sure to use a secure secret
      { expiresIn: "1d" } // Adjust token expiration as needed
    );

    // Send response with token and user data
    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        boughtBooks: user.boughtBooks, // Consider only sending book IDs or necessary info if this is large
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
};

// Purchase a book (add purchased book to user)
exports.purchaseBook = async (req, res) => {
  const { userEmail, bookIds } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const books = await Book.find({ _id: { $in: bookIds } });
    if (books.length !== bookIds.length) {
      return res.status(404).json({ error: "One or more books not found" });
    }

    let booksAdded = 0;
    for (let book of books) {
      if (!user.boughtBooks.includes(book._id)) {
        user.boughtBooks.push(book._id);
        booksAdded++;
      }
    }

    if (booksAdded === 0) {
      return res
        .status(400)
        .json({ error: "These books have already been purchased." });
    }

    await user.save();

    return res.status(200).json({
      message: `Successfully purchased ${booksAdded} book(s)`,
      updatedBoughtBooks: user.boughtBooks,
    });
  } catch (error) {
    console.error("Error purchasing books:", error);
    return res.status(500).json({ error: "Failed to purchase books" });
  }
};
exports.getBoughtBooks = async (req, res) => {
  try {
    // Extract userId from the URL parameters
    const userId = req.params.userId;

    // Find the user by their ID without populating the 'boughtBooks' field
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If no bought books are found, respond accordingly
    if (user.boughtBooks.length === 0) {
      return res.status(200).json({ message: "No bought books found" });
    }

    // Respond with the list of bought books as an array of ObjectIds
    res.status(200).json(user.boughtBooks); // This will return the array of ObjectIds
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving bought books" });
  }
};
// Get bought books for a specific user
// In userController.js

// Get user's bought books based on userId
// Get user's purchased books
// userController.js
