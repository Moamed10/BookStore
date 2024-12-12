const express = require("express");
// require("./config/mongoose")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

// routes
const bookRoutes = require("./src/books/book.route");
const userRoutes = require("./src/users/user.route");

let port = 3100;
app.listen(port, () => {
  console.log(`app is on ${port}`);
});
