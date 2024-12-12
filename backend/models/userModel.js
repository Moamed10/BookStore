const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["reader", "writer "],
        default: "reader",
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user", userSchema);
