const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_LINK)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });
//DB_LINK=mongodb+srv://endless-team:qv7eI8CZwxSqshHF@endless-library.60hzq.mongodb.net/?retryWrites=true&w=majority&appName=Endless-Library