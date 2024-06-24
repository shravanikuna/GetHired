const express = require("express");
const router = express.Router();
const { resume,
    addeducation,
    editeducation,
    deleteeducation,
    addskill,
    editskill,
    deleteskill,
    addjob,
    editjob,
    deletejob,
    addinternship,
    editinternship,
    deleteinternship,
    addresponsibilities,
    editresponsibilities,
    deleteresponsibilities,
    addproject,
    editproject,
    deleteproject,
    addcourse,
    editcourse,
    deletecourse,
    addaccomplishment,
    editaccomplishment,
    deleteaccomplishment,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

// GET
router.get("/", isAuthenticated, resume)

//POST---------------------------Education-----------------------------
router.post("/add-edu", isAuthenticated, addeducation)
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)

//POST------------------------------ Skill-----------------------------
router.post("/add-skill", isAuthenticated, addskill)
router.post("/edit-skill/:skillid", isAuthenticated, editskill)
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill)

//POST--------------------------------- Job--------------------------------
router.post("/add-job", isAuthenticated, addjob)
router.post("/edit-job/:jobid", isAuthenticated, editjob)
router.post("/delete-job/:jobid", isAuthenticated, deletejob)

//POST---------------------Internships-------------------------
router.post("/add-internship", isAuthenticated, addinternship)
router.post("/edit-internship/:internshipid", isAuthenticated, editinternship)
router.post("/delete-internship/:internshipid", isAuthenticated, deleteinternship)

//POST------------------------------- Responsibilities-------------------------
router.post("/add-responsibilities", isAuthenticated, addresponsibilities)
router.post("/edit-responsibilities/:responsibilitiesid", isAuthenticated, editresponsibilities)
router.post("/delete-responsibilities/:responsibilitiesid", isAuthenticated, deleteresponsibilities)

//POST ---------------------------------Project--------------------------------
router.post("/add-project", isAuthenticated, addproject)
router.post("/edit-project/:projectid", isAuthenticated, editproject)
router.post("/delete-project/:projectid", isAuthenticated, deleteproject)

//POST ------------------------------Course---------------------------
router.post("/add-course", isAuthenticated, addcourse)
router.post("/edit-course/:courseid", isAuthenticated, editcourse)
router.post("/delete-course/:courseid", isAuthenticated, deletecourse)

//POST --------------------------Accomplishments------------------------
router.post("/add-accomplishment", isAuthenticated, addaccomplishment)
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, editaccomplishment)
router.post("/delete-accomplishment/:accomplishmentid", isAuthenticated, deleteaccomplishment)




module.exports = router;   