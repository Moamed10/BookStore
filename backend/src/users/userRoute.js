const express = require('express');
const router = express.Router();
const { signupUser } = require('./userController');


router.post('/signup-user',signupUser)
 
module.exports = router;