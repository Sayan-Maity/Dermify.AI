const express = require("express")
const { dermaPrompt } = require("../controllers/DermaPrompt")
const { educationPrompt } = require("../controllers/EducationPrompt")
const { recommendationPrompt } = require("../controllers/RecommendationPrompt")
const router = express.Router()

router.post("/dermaFinalPrompt", dermaPrompt)
router.post("/educationPrompt", educationPrompt)
router.post("/recommendationPrompt", recommendationPrompt)


module.exports = router