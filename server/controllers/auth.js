
const User = require("../modals/user")
const bcrypt = require("bcrypt")
const {  validationResult } = require('express-validator');
const { expressjwt: jwtt } = require("express-jwt");
const jwt = require("jsonwebtoken")

require('dotenv').config()

exports.signup = (req,res) => {

    // basic validations
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(404).json({errors: errors.array()})
    }
    // check if user already exists
    User.findOne({email: req.body.email})
    .then((user)=> {
        if(user)
        {
            return res.status(404).json({"success":false,"message":"Account with this email already exists."})
        }

        bcrypt.hash(req.body.password,10, (err,has)=> {
        
            if(err)
            return res.status(404).json({"success":false,"message":"Please Try Again"})

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: has,
    
            })
    
            newUser.save()
            .then( person => res.status(200).json({success: true,name: person.name, email: person.email,password: person.password}))
            .catch(err => res.status(500).json({"success":false,"message":"Some error occured please try again."}))

        })
      
    })
    .catch(err => res.status(404).json({"success":false,"message":"Some error occured please try again."}))
}

exports.signin = (req,res) => {
    // basic validations
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(404).json({error: errors.array()[0].msg})
    }

    const {email,password} = req.body;

    // check if user exits
    User.findOne({email: email})
    .then((user)=>{
        // if not exists
        if(!user)
        return res.status(400).json({success:false,err: "Invalid Details"})
        // if exists then Match Password
        bcrypt.compare(password,user.password,(err,result)=> {

            // password doesn't matches
            if(!result)
            return res.status(404).json({"success":false,"message":"Invalid Details"})

            // Password Matches then generate token
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                _id: user._id,
                role: user.role,
                amount: user.wallet
            }, process.env.SECRET)

            // setting the token in the cokkie of users brower
            res.cookie("token",token,{expire: new Date()+999})
            // sending the token 
            res.send({"success":true,token: token,user: user})


        })
    })
    .catch(err => res.status(404).json({"success":false,"message":"Some error occured please try again."}))


}

exports.signout = (req,res) => {
   res.clearCookie("token");
   res.json({success: "User Signed Out"})

}

exports.isSignedIn = jwtt(
    
    {
        secret:process.env.SECRET,
        algorithms: ["HS256"],
    }
)

// Custom Middlewares
exports.isAuthenticated = (req,res,next) => {
    const checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker)
    return res.status(403).json({
        error: "Access Denied"
    })
    next();
}

exports.isAdmin = (req,res,next) => {
    console.log(req.auth)

    if(req.auth.role === 0)
   return res.status(403).json({
        error: "Access Denied. You are not Admi"
    })

    next();
}