exports.catchasyncErrors =(func)=> (req,res,next) =>{
Promise.resolve(func(req,res,next)).catch(next)
}
// If there is any error catch the next nor pass the func (reslove)

