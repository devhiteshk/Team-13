const express  = require("express")
const router = express.Router()
const {signup, signin, signout, isSignedIn} = require("../controllers/auth")
const { body } = require('express-validator');


// express validators
router.post("/signup",
            body("email").isEmail().withMessage("Invalid Email"),
            body("password").isLength({min: 8}).withMessage("Password must be atleast 8 chars"),
            body("name").isLength({min: 3}).withMessage("Name Must be of minimum 3 chars")
            ,signup)


router.post("/signin",
            body("email").isEmail().withMessage("Invalid Email"),
            body("password").isLength({min: 8}).withMessage("Invalid Password")
            ,signin)


router.get("/signout",signout)


// protected Routes
router.get("/test",isSignedIn,(req,res)=> res.json(req.auth))




module.exports = router