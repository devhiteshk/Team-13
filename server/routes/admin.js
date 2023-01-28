const express  = require("express")
const router = express.Router()
const {signup, signin, signout, isSignedIn, isAdmin} = require("../controllers/auth")
const { body } = require('express-validator');
const {generateQr}  = require("../controllers/admin")

// express validators
router.post("/",isSignedIn,isAdmin,generateQr)

module.exports = router