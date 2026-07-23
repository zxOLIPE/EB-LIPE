const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Login
router.get("/login", authController.login);
router.get("/roblox", authController.login);

// Callback
router.get("/callback", authController.callback);

module.exports = router;