// index.js or app.js
const express = require("express");
const dotenv = require("dotenv").config();
require("./config/mongoose");
const bookRoute = require("./src/books/bookRoute"); // Path to your book routes
const app = express();

// Serve static files (uploaded images)
app.use("/uploads", express.static("uploads"));

// Middleware to parse URL-encoded data and JSON body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use book routes
app.use("/api", bookRoute); // Ensures that all routes in bookRoute.js start with /api

// Set the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
