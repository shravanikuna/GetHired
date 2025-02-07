const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchasyncErrors } = require("./catchasyncError");

exports.isAuthenticated = catchasyncErrors(async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to acess the resource", 401))
    }
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    req.id = id;
    // res.json(id, token)
    next();

})