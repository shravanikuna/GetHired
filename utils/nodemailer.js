const nodemailer = require('nodemailer');
const ErrorHandler = require('./ErrorHandler');


exports.sendEmail = async (req,res, next, url) => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        post: 465,
        auth: {
            user: process.env.Email_Address,
            pass: process.env.Email_Password

    }
    });
    const mailOptions= {
        from:"Shravani Private Limited ",
        to: req.body.email,
        subject: "Reset Password",
        html: `<h1>Click on the link to reset your password </h1>
        <a href="${url}">Rest Password Link</a>`
     };
   transport.sendMail(mailOptions,(err, info)=>{

    if(err) return next(
    new ErrorHandler("Email could not be sent", 500))
    console.log(info)

    return res.status(200).json({
        message: "Email sent sucessfully",
        url,
    });
   })
}