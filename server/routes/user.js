const express  = require("express")
const router = express.Router()
const {updateJourneyStatus} = require("../controllers/user")

router.post("/updateJourneyStatus" , updateJourneyStatus)

module.exports = router