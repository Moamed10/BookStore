const express = require("express");
const userRoute=require('./src/users/userRoute')
require("./config/mongoose")
const cors=require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use('/signup-user',userRoute)

let port = 3100;
app.listen(port, () => {
  console.log(`app is on ${port}`);
});
