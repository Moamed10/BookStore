require("dotenv").config();
const express = require("express");
const userControl=require("../backend/src/users/userController")
// const userRoute=require('./src/users/userRoute')
require("./config/mongoose")
const Cors=require("cors")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(Cors({
  methods:["GET", "POST", "UPDATE", "DELETE"],
  origin:[5173,"http://localhost:5173/"]
}));

app.get("/signup",userControl.renderSignup)
app.post("/signup-user",userControl.signup)

// app.use('/signup-user',userRoute)

const port = process.env.PORT || 3800;
app.listen(port, () => {
  console.log(`app is on ${port}`);
});
