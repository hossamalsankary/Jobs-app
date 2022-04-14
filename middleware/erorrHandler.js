const { StatusCodes } = require('http-status-codes');

//here We Catch The Erorr and Handel It
const errorHandlerMiddleware = (erorr, req, res, next) => {
  let{code} = erorr;
  console.log(code)
 if( code == 11000){erorr.statusCode = StatusCodes.METHOD_NOT_ALLOWED};
 erorr.statusCode = erorr.statusCode || 500;

  switch (erorr.statusCode) {
    case 500:
      res
        .status(erorr.statusCode)
        .json({ massage: "Opps Some Thing Went Wrong" });

      break;
    case 400:
      res
        .status(erorr.statusCode)
        .json({ massage: "Opps We Missing Some Data" });

      break;
    case 401:
      res
        .status(erorr.statusCode)
        .json({ massage: "UNAUTHORIZED" });

      break;
      case 405:
        res
          .status(erorr.statusCode)
          .json({ massage: "This Email Is Used Befor" });
  
        break;

    default:
      break;
  }
};
module.exports = errorHandlerMiddleware;
