const mongoose = require("mongoose");

const favBookSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
    },
    
    createdAt:{
            type:Date,
            default:Date.now
    }
    
});

const favBook = mongoose.model("favBook", favBookSchema);

module.exports = favBook;