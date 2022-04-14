  let notFound = (req,res)=>{
    res.status(404).json({massage:"this route dosn`t exixit"});
    };

    module.exports = notFound;