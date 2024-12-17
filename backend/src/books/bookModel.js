const mongoose = require("mongoose");

const categories = [
  "choose category", // This could be an optional placeholder value
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: categories, // Restrict category to the values in the categories array
  },
  trending: {
    type: Boolean,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (assuming there is a User model)
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
