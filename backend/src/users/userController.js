const bcrypt = require("bcrypt");
const User = require("./userModel");

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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter both email and password." });
    }

    const user = await User.findOne({ email });
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
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Ensure all required fields are provided
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        error: "Email, old password, and new password are required.",
      });
    }

    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Verify the old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect old password." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
