const { catchasyncErrors } = require("../middlewares/catchasyncError")
const Student = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchasyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "This is RESUME Page", resume })
});

//-----------------------------------Education-----------------------------
exports.addeducation = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added" })
});
// Edit education
exports.editeducation = catchasyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex
        (i => i.id === req.params.eduid);
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "Education Updated" })
});
// Delete education 
exports.deleteeducation = catchasyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter
        (i => i.id !== req.params.eduid);

    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education Deleted" })
});
//-------------------------------- Skill--------------------------------
exports.addskill = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Skill Added" })
});
//    Edit Skill
exports.editskill = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex
        (i => i.id === req.params.skillid);
    student.resume.skills[skillIndex] = {
        ...student.resume.skills[skillIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "Skill Updated" })
});
//    Delete Skill
exports.deleteskill = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterskill = student.resume.skills.filter
        (i => i.id !== req.params.skillid);

    student.resume.skills = filterskill;
    await student.save();
    res.json({ message: "Skill Deleted" })
});

//--------------------------------------- Job--------------------------------
exports.addjob = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Job Added" })
});
//    Edit Job
exports.editjob = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex
        (i => i.id === req.params.jobid);
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "Job Updated" })
});
//    Delete Job 
exports.deletejob = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterjob = student.resume.jobs.filter
        (i => i.id !== req.params.jobid);

    student.resume.jobs = filterjob;
    await student.save();
    res.json({ message: "Job Deleted" })
});

//---------------------------- Interships--------------------------------
exports.addinternship = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "internship Added" })
});
//    Edit internship
exports.editinternship = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internshipIndex = student.resume.internships.findIndex
        (i => i.id === req.params.internshipid);
    student.resume.internships[internshipIndex] = {
        ...student.resume.internships[internshipIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "internship Updated" })
});
//    Delete internship
exports.deleteinternship = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterinternship = student.resume.internships.filter
        (i => i.id !== req.params.internshipid);

    student.resume.internships = filterinternship;
    await student.save();
    res.json({ message: "internship Deleted" })
});

//---------------------------------Responsibilities----------------------------
exports.addresponsibilities = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "responsibilitie Added" })
});
//    Edit responsibilities
exports.editresponsibilities = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const responsibilitiesIndex = student.resume.responsibilities.findIndex
        (i => i.id === req.params.responsibilitiesid);
    student.resume.responsibilities[responsibilitiesIndex] = {
        ...student.resume.responsibilities[responsibilitiesIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "responsibilities Updated" })
});
//    Delete responsibilities
exports.deleteresponsibilities = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterresponsibilities = student.resume.responsibilities.filter
        (i => i.id !== req.params.responsibilitiesid);

    student.resume.responsibilities = filterresponsibilities;
    await student.save();
    res.json({ message: "internship Deleted" })
});

//---------------------------Projects--------------------------------
exports.addproject = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Projects Added" })
});
//    Edit Project
exports.editproject = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectIndex = student.resume.projects.findIndex
        (i => i.id === req.params.projectid);
    student.resume.projects[projectIndex] = {
        ...student.resume.projects[projectIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "Project Updated" })
});
//    Delete Project
exports.deleteproject = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterproject = student.resume.projects.filter
        (i => i.id !== req.params.projectid);
    student.resume.projects = filterproject;
    await student.save();
    res.json({ message: "Project Delted" })
});

//-----------------------------------Course--------------------------------
exports.addcourse = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.course.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "course Added" })
});
//Edit course
exports.editcourse = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const courseIndex = student.resume.course.findIndex
        (i => i.id === req.params.courseid);
    student.resume.course[courseIndex] = {
        ...student.resume.course[courseIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "course Updated" })
});
//Delete course
exports.deletecourse = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filtercourse = student.resume.course.filter
        (i => i.id !== req.params.courseid);
    student.resume.course = filtercourse;
    await student.save();
    res.json({ message: "course Delted" })
});

//---------------------------------Accomplishment--------------------------------
exports.addaccomplishment = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "accomplishment Added" })
});
//    Edit accomplishment
exports.editaccomplishment = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accomplishmentIndex = student.resume.accomplishments.findIndex
        (i => i.id === req.params.accomplishmentid);
    student.resume.accomplishments[accomplishmentIndex] = {
        ...student.resume.accomplishments[accomplishmentIndex],
        ...req.body,
    }
    await student.save();
    res.json({ message: "accomplishment Updated" })
});
//    Delete accomplishment
exports.deleteaccomplishment = catchasyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteraccomplishment = student.resume.accomplishments.filter
        (i => i.id !== req.params.accomplishmentid);
    student.resume.accomplishments = filteraccomplishment;
    await student.save();
    res.json({ message: "accomplishment Delted" })
});   