const bcrypt = require('bcryptjs');
const userModel = require('./userModel');


const renderSignup = (req, res) => {
  res.render("signup", {
      err: ""
  })
}

const signup = async (req, res) => {
  console.log('hellooo',req.body)

  let userEmail = await userModel.findOne({email: req.body.email});

  if(userEmail) {
      
      res.status(400).send("User is already exist... please login!")
      res.render("signup", {
          err: "User is already exist... please login!"
      })
  } else {
      
      let hashPass = bcrypt.hashSync(req.body.password, 10);

      if(hashPass) {
          
          
          let userData = {
              ...req.body,
              password: hashPass
          }
          
          let newUser = new userModel(userData);

          newUser.save()
              .then( () => {
                  // res.redirect("/login");
                  res.status(200).send("User is registered...") 
              })
              .catch( err => {
                  console.log(err);
              })
      } else {
          res.status(500).send("something went wrong... try again later please")
          res.render("signup", {
              err: "something went wrong... try again later please"
          })
      }
  }
}

module.exports = {
  renderSignup,
  signup
}



