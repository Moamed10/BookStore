const express = require("express");
require("./config/mongoose");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is on ${port}`);
});
