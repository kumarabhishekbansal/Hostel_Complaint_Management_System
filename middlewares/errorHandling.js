const errorResponseHandling=(err,req,res,next)=>{
    const statusCode=err.statusCode || 400;
    res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV==='production'?null:err.stack,
    });
}

const invalidPathHandler=(req,res,next)=>{
    let error=new Error("Invalid Path");
    err.statusCode=404;
    next(error);
}

module.exports={
    errorResponseHandling,
    invalidPathHandler
}