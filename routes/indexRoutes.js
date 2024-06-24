const express = require("express");
const router = express.Router();
const { homepage,currentUser, studentsignup, studentsignout, studentsignin, studentsendmail 
,studentforgetpassword,
studentresetpassword,
studentupdatedetails,
studentavatar,
applyinternship,
applyjob
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

// GET
router.get("/",isAuthenticated, homepage)

// POST/student
router.post("/student/current", isAuthenticated, currentUser)

// POST student/signup
router.post("/student/signup", studentsignup)

// POST student/signin
router.post("/student/signin", studentsignin)

// Get student/signout
router.get("/student/signout",isAuthenticated, studentsignout)

//POST Send Mail
router.post("/student/send-mail", studentsendmail)

// GET Forget Password/:studentid
router.get("/student/forgetpassword/:id", studentforgetpassword)

// POST Reset Password/:studentid
router.post("/student/resetpassword/:id",isAuthenticated, studentresetpassword)

// POST Update Details/:studentid
router.post("/student/updatedetails/:id",isAuthenticated, studentupdatedetails)

// POST Avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar)

// POST apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship)

// // POST apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob)


module.exports = router;   