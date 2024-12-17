const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favoriteBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
