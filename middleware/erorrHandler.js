//here We Catch The Erorr and Handel It
const errorHandlerMiddleware = (erorr , req ,res,next)=>{
    erorr.statusCode = erorr.statusCode || 500;
    console.error("------------------------",erorr.statusCode);
   res.status(erorr.statusCode).json({massage:"Opps Some Thing Went Wrong"});

};
module.exports = errorHandlerMiddleware;