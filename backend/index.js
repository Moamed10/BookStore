const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
require("./config/mongoose"); // MongoDB connection

const bookRoute = require("./src/books/bookRoute"); // Path to book routes
const userRoutes = require("./src/users/userRoute"); // Path to user routes

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (update if needed)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Serve static files (uploaded images)
app.use("/uploads", express.static("uploads")); // To serve uploaded images

// Use routes
app.use(bookRoute); // Book-related routes
app.use(userRoutes); // User-related routes

// Set the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
