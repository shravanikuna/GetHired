require("dotenv").config({ path: "./.env"})
const express = require ("express");
const app = express()
// DB Connection
require("./models/database").connectDatabase();
// logger
const logger = require("morgan");
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

// Session and Cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
// Activate cookies-- code/token is saved in browser until the session end's / the given time expires.
app.use(cookieparser());

// Express File Upload
const fileupload = require("express-fileupload");
app.use(fileupload());

// Routes
app.use("/", require("./routes/indexRoutes"))
app.use("/resume", require("./routes/resumeRoutes"))
app.use("/employee", require("./routes/employeeRoutes"))

 

// Error Handling
const ErrorHandler = require("./utils/ErrorHandler");
const {generatedErrors} = require("./middlewares/errors")
app.all("*", (req, res, next)=>{
    next( new ErrorHandler(`Requested URL Not Found${req.url}`, 404))
})
app.use(generatedErrors)




app.listen( process.env.PORT,
console.log(`server running on port ${process.env.PORT}`))