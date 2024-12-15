require("dotenv").config();
const mongoose = require("mongoose");

const dbLink = process.env.DB_LINK;

mongoose
  .connect(dbLink)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
