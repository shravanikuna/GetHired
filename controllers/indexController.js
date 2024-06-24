const { catchasyncErrors } = require("../middlewares/catchasyncError")
const Student = require("../models/studentmodel");
const Internship = require("../models/internshipModel");
const Job= require("../models/jobModel");

const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const path = require("path");
const { sendEmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImagekit();
// exports.homepage =  (req, res, next)=>{
//     res.json({message: "This is INDEX Page"})
//    }
// Above one is sync Error hanlder below async
exports.homepage = catchasyncErrors(async (req, res, next) => {
  res.json({ message: "homepage" })
  // try {
  //     res.json({message: "homepage"})
  // } catch (error) {
  //     res.json(error)
  // }
});

exports.currentUser = catchasyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student });
});

exports.studentsignup = catchasyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  // res.status(201).json(student);
  sendtoken(student, 201, res);
});

exports.studentsignin = catchasyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
  if (!student) return next(new ErrorHandler("Couldn't the user with the given Email address", 404))
  // res.json(student)
  const isMatch = student.comparepassword(req.body.password)
  if (!isMatch) return next(new ErrorHandler("Incorrect Password", 404))
  sendtoken(student, 200, res);
});


exports.studentsignout = catchasyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  // res.json({token})
  res.json({ message: "Sucessfully Signout" })
});
// res.status(statusCode).cookie("token", token, options)
//  .json({sucess: true, id: student._id, token})

exports.studentsendmail = catchasyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student)
    return next(
      new ErrorHandler("Couldn't the user with the given Email address", 404));
  const url = `${req.protocol}://${req.get("host")}/student/restpassword/${student._id}`;

  sendEmail(req, res, next, url);
  student.resetPasswordToken = 1;
  await student.save();
  res.json({ student, url })
})

exports.studentforgetpassword = catchasyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();

  if (!student)
    return next(
      new ErrorHandler("Couldn't the user with the given Email address", 404));

      if(student.resetPasswordToken == 1){
        student.resetPasswordToken = 0;
        student.password = req.body.password;
      }else{
        return next(
          new ErrorHandler("Password Already Changed", 404));
      }
      await student.save();

  res.status(200).json({ message: "Password Changed Sucessfully"})
})

exports.studentresetpassword = catchasyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  
  student.password = req.body.password;
  await student.save();
 sendtoken(student, 200, res);
  res.status(200).json({ message: "Password Reset Sucessfully"})
})
 
exports.studentupdatedetails = catchasyncErrors(async(req,res,next)=>{
Student.findByIdAndUpdate(req.params.id, req.body).exec();
res.status(200).json({message: "Details Updated Sucessfully"})
});

exports.studentavatar = catchasyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName= `resumebuilder-${Date.now()}${path.extname(file.name)}`;

  if(student.avatar.fileId !== ""){
    await imagekit.deleteFile(student.avatar.fileId);
  }
  const {fileId, url} = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  })
  student.avatar = { fileId, url}
   await student.save();
  res.status(200).json({
    success: true,
    message:"Profile uploaded Sucessfully"
  })
})

// Apply Internships
exports.applyinternship = catchasyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();

  student.internships.push(internship._id);
  internship.students.push(student._id);
 
  await student.save();
  await internship.save();
   res.json({ student,internship, message: "Applied for Internship Sucessfully"})
})
// Apply Jobs
exports.applyjob = catchasyncErrors(async(req,res,next)=>{
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();

  student.jobs.push(job._id);
  job.students.push(student._id);

  await student.save();
  await job.save();
   res.json({ student,job, message: "Applied for job Sucessfully"})
})