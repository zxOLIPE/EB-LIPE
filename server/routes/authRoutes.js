const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Login com Roblox
router.get("/login", authController.login);

// Callback do Roblox
router.get("/callback", authController.callback);

module.exports = router;