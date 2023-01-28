const express  = require("express")
const router = express.Router()
const {updateJourneyStatus, getJourneyTransactions, getWalletTransactions, getStationDensity, getUser} = require("../controllers/user")
const { isSignedIn} = require("../controllers/auth")

router.get("/", isSignedIn , getUser)
router.post("/updateJourneyStatus", isSignedIn , updateJourneyStatus)
router.get("/walletTransactions", isSignedIn ,  getWalletTransactions)
router.get("/journeyTransactions", isSignedIn , getJourneyTransactions)



router.get("/station/density", getStationDensity)
module.exports = router