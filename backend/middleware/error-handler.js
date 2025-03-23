const errorHandlerMiddleware = async(err, req, res, next)=>{
    console.log("Error handler middleware saying error....",err);
    return res.status(500).json({msg:err});
}

module.exports = errorHandlerMiddleware;