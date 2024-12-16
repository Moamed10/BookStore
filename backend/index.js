require("dotenv").config();
const express = require("express");
const userRoute=require('./src/users/userRoute')
require("./config/mongoose")
const cors=require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use('/signup-user',userRoute)

const port = process.env.PORT || 3800;
app.listen(port, () => {
  console.log(`app is on ${port}`);
});
