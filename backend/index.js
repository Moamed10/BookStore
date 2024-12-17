require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/mongoose"); // MongoDB connection
const userRoutes = require("./src/users/userRoute"); // Adjust path as needed

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Use the router file for user-related routes
app.use(userRoutes);
// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
