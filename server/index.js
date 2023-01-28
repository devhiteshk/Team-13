const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
const { Router } = require('express');
require('dotenv').config()

// db connection
mongoose.connect(process.env.DATABASE).then(()=> console.log("Database Connected"))

// MY routes
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser()) // to insert the jwt token in the cokkie of user broswer

// Custom Routes
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes)

app.listen(process.env.PORT || 3001, () => console.log("Listenign at port"))