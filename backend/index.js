const express = require("express");
const userRoute=require('./src/users/userRoute')
require("./config/mongoose")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/signup-user',userRoute)

let port = 3100;
app.listen(port, () => {
  console.log(`app is on ${port}`);
});
