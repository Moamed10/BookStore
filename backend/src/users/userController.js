const bcrypt = require("bcrypt");
const User = require("./userModel");
const Book = require("../books/bookModel"); // Assuming you have a Book model
const jwt = require("jsonwebtoken");

// Sign up user
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Both email and password are required." });
    }

    const user = await User.findOne({ email }).populate("boughtBooks");
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || "yourSecretKeyHere",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        boughtBooks: user.boughtBooks,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "An error occurred. Please try again later." });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "Email, old password, and new password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect old password." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Purchase a book
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
    books.forEach(book => {
      if (!user.boughtBooks.includes(book._id)) {
        user.boughtBooks.push(book._id);
        booksAdded++;
      }
    });

    if (booksAdded === 0) {
      return res.status(400).json({ error: "These books have already been purchased." });
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

// Get bought books for a specific user
exports.getBoughtBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.boughtBooks.length === 0) {
      return res.status(200).json({ message: "No bought books found" });
    }

    res.status(200).json(user.boughtBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving bought books" });
  }
};
