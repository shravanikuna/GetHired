exports.sendtoken =(student, statusCode, res)=> {
 const token = student.getjwttoken();
 const options = {
    expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000
    ),
    httpOnly: true,
    // secure: true,

 };
 res.status(statusCode)
 .cookie("token", token, options)
 .json({sucess: true, id: student._id, token})
//  res.json({token})

};
exports.sendtoken =(employee, statusCode, res)=> {
    const token = employee.getjwttoken();
    const options = {
       expiresIn: new Date(
           Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000
       ),
       httpOnly: true,
       // secure: true,
   
    };
    res.status(statusCode)
    .cookie("token", token, options)
    .json({sucess: true, id: employee._id, token})
   //  res.json({token})
   
   };