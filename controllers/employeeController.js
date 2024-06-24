const { catchasyncErrors } = require("../middlewares/catchasyncError")
const Employee = require("../models/employeeModel");
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")


const { sendtoken } = require("../utils/SendToken");
const path = require("path");
const { sendEmail } = require("../utils/nodemailer");
const ErrorHandler = require("../utils/ErrorHandler");
const imagekit = require("../utils/imagekit").initImagekit();
// exports.homepage =  (req, res, next)=>{
//     res.json({message: "This is INDEX Page"})
//    }
// Above one is sync Error hanlder below async
exports.homepage = catchasyncErrors(async (req, res, next) => {
  res.json({ message: "Secure Employee Homepage" })
  // try {
  //     res.json({message: "homepage"})
  // } catch (error) {
  //     res.json(error)
  // }
});

exports.currentEmployee  = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  res.json({ employee });
});

exports.employeesignup = catchasyncErrors(async (req, res, next) => {
  const employee = await new Employee(req.body).save();
  // res.status(201).json(employee);
  sendtoken(employee, 201, res);
});

exports.employeesignin = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }).select("+password").exec();
  if (!employee) return next(new ErrorHandler("Couldn't the user with the given Email address", 404))
  // res.json(employee)
  const isMatch = employee.comparepassword(req.body.password)
  if (!isMatch) return next(new ErrorHandler("Incorrect Password", 404))
  sendtoken(employee, 200, res);
});

exports.employeesignout = catchasyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  // res.json({token})
  res.json({ message: "Sucessfully Signout" })
});
// res.status(statusCode).cookie("token", token, options)
//  .json({sucess: true, id: employee._id, token})

exports.employeesendmail = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }).exec();
  if (!employee)
    return next(
      new ErrorHandler("Couldn't the user with the given Email address", 404));
  const url = `${req.protocol}://${req.get("host")}/employee/forgetpassword/${employee._id}`;

  sendEmail(req, res, next, url);
  employee.resetPasswordToken = 1;
  await employee.save();
  res.json({ employee, url })
})

exports.employeeforgetpassword = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).exec();

  if (!employee)
    return next(
      new ErrorHandler("Couldn't the user with the given Email address", 404));

  if (employee.resetPasswordToken == 1) {
    employee.resetPasswordToken = 0;
    employee.password = req.body.password;
    await employee.save();
  } else {
    return next(
      new ErrorHandler("Invalid Password Link! Please try again", 500));
  }

  res.status(200).json({ message: "Password Changed Sucessfully" })
})

exports.employeeresetpassword = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();

  employee.password = req.body.password;
  await employee.save();
  sendtoken(employee, 200, res);
  res.status(200).json({ message: "Password Reset Sucessfully" })
})

exports.employeeupdatedetails = catchasyncErrors(async (req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({ message: "Details Updated Sucessfully" })
});

exports.organizationlogo = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).exec();
  const file = req.files.organizationlogo;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

  if (employee.organizationlogo.fileId !== "") {
    await imagekit.deleteFile(Employee.organizationlogo.fileId);
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  })
  employee.organizationlogo = { fileId, url }
  await employee.save();
  res.status(200).json({
    success: true,
    message: "Organizationlogo uploaded Sucessfully"
  })
})

// ---------------------------------------Internships-----------------------------------
// Create Internship
exports.createinternship = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  const internship = await new Internship(req.body).save();
  internship.employee = employee._id;
  employee.internships.push(internship._id);
  await internship.save();
  await employee.save(); 
  res.status(201).json({ success: true, internship });
});
// Read Internship
// exports.readinternship = catchasyncErrors(async (req, res, next) => {
//   const internship = await Internship.find().exec();
//   res.status(201).json({ success: true, internship });
// });
exports.readinternship = catchasyncErrors(async (req, res, next) => {
  const {internships} = await Employee.findById(req.id)
  .populate("internships")
  .exec();
  res.status(201).json({ success: true, internships });
});

// Read Single Internship
exports.readsingleinternship = catchasyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});
// ---------------------------------------JOBS-----------------------------------
// Create Jobs
exports.createjob = catchasyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  const job = await new Job(req.body).save();
  job.employee = employee._id;
  employee.jobs.push(job._id);
  await job.save();
  await employee.save(); 
  res.status(201).json({ success: true, job });
});
// Read Jobs
exports.readjob = catchasyncErrors(async (req, res, next) => {
  const {jobs} = await Employee.findById(req.id)
  .populate("jobs")
  .exec();
  res.status(200).json({ success: true, jobs });
});

// Read Single job
exports.readsinglejob = catchasyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});