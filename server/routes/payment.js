const express  = require("express")
const router = express.Router()
const {createOrder} = require("../controllers/payment")
const { isSignedIn} = require("../controllers/auth")

router.get("/createOrder", isSignedIn , createOrder)


module.exports = router