const express  = require("express")
const router = express.Router()
const {signup, signin, signout, isSignedIn, isAdmin} = require("../controllers/auth")
const {generateQr,allQrs}  = require("../controllers/admin")

// express validators
router.post("/generateQr",isSignedIn,isAdmin,generateQr)
router.get("/allqrs",isSignedIn,isAdmin,allQrs)

module.exports = router