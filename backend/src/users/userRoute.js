const express = require("express");
const router = express.Router();
const userController = require("./userController"); // Make sure the path is correct

// POST route for signup
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/change-password", userController.changePassword);
router.post("/purchase", userController.purchaseBook);
router.get("/user/:userId/bought-books", userController.getBoughtBooks);

module.exports = router;
