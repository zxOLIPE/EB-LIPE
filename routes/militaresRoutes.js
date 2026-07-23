const express = require("express");
const router = express.Router();

const militaresController = require("../controllers/militaresController");

router.get("/:nome", militaresController.buscarMilitar);

module.exports = router;