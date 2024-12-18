const express = require("express");
const router = express.Router();
const userController = require("./userController"); // Make sure the path is correct

// POST route for signup
router.post("/signup", userController.signup);
router.post("/login", userController.login);
module.exports = router;
