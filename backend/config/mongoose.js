const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Zahra:t1E2hclk7swUK4Y7@assignments.uqnhk.mongodb.net/?retryWrites=true&w=majority&appName=assignments")
    .then( () => {
        console.log("DB is connected");
    })
    .catch( err => {
        throw err
    })