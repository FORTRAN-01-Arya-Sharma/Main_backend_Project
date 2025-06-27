const asyncHandler =(reqestHandler) =>{
    (req,res,next)=>{
        Promise.resolve(reqestHandler(req,res,next)).reject((err) => next(err))
    }
}
export {asyncHandler}






// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).jason({
//             sucess:false,
//             message:err.message
//         })
//     }
// }