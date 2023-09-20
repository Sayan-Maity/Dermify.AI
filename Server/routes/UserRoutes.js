const express = require("express");
const { diseaseHistory } = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/saveDisease", authMiddleware, diseaseHistory);

module.exports = router;

