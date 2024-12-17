const mongoose = require("mongoose");

const favBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const favBook = mongoose.model("favBook", favBookSchema);

module.exports = favBook;
