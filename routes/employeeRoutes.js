const express = require("express");
const router = express.Router();
const { 
    homepage,
    currentEmployee,
    employeesignup,
    employeesignout,
    employeesignin,
    employeesendmail,
    employeeforgetpassword,
    employeeresetpassword,
    employeeupdatedetails,
    organizationlogo,
    createinternship,
    readinternship, 
    readsingleinternship,
    createjob,
    readjob, 
    readsinglejob,
} = require("../controllers/employeeController");
const { isAuthenticated } = require("../middlewares/auth");

// GET
router.get("/",isAuthenticated, homepage)

// // POST/employee
router.post("/current", isAuthenticated, currentEmployee)

// POST employee/signup
router.post("/signup", employeesignup)

// POST employee/signin
router.post("/signin", employeesignin)

// Get employee/signout
router.get("/signout",isAuthenticated, employeesignout)

//POST Send Mail
router.post("/send-mail", employeesendmail)

// GET Forget Password/:employeeid
router.get("/forgetpassword/:id", employeeforgetpassword)

// POST Reset Password/:employeeid
router.post("/resetpassword/:id",isAuthenticated, employeeresetpassword)

// POST Update Details/:employeeid
router.post("/updatedetails/:id",isAuthenticated, employeeupdatedetails)

// POST organizationlogo/:employeeid
router.post("/organizationlogo/:id", isAuthenticated, organizationlogo)


// ------------------------Internship------------------------
// POST /internship/create
router.post("/internship/create", isAuthenticated, createinternship)

// POST /internship/read
router.post("/internship/read", isAuthenticated, readinternship)

// POST /internship/readsingleinternship
router.post("/internship/read/:id", isAuthenticated, readsingleinternship)
module.exports = router;    

// ------------------------Jobs------------------------
// POST /job/create
router.post("/job/create", isAuthenticated, createjob)

// POST /job/read
router.post("/job/read", isAuthenticated, readjob)

// POST /job/readsinglejob
router.post("/job/read/:id", isAuthenticated, readsinglejob)
module.exports = router;   