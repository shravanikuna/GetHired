class ErrorHandler extends Error{
    constructor(message, statusCode){
     super(message);
     this.statusCode = statusCode
     Error.captureStackTrace(this, this.constructor)
    }
}


module.exports = ErrorHandler
// We are using a js class in our class ErrorHandler (inherit)