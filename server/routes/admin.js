const express  = require("express")
const router = express.Router()
const {signup, signin, signout, isSignedIn, isAdmin} = require("../controllers/auth")
const {generateQr}  = require("../controllers/admin")

// express validators
router.post("/generateQr",generateQr)

module.exports = router