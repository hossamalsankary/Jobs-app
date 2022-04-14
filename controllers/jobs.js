const job = require("../module/job");
const jwt = require("jsonwebtoken");

const jobs = {
  //Get All Jobs In the App
  getAll: async (req, res) => {
    const jobs = await job.find({});
    res.json({ data: jobs });
  },
  userProfile: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      let handelToken = token.slice(7);

      let verifyToken = jwt.verify(handelToken, process.env.SECRET);
      let findJobForUser = await job.find({ createdBy: verifyToken.data.id });

      res.json(findJobForUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      let handelToken = token.slice(7);

      let verifyToken = jwt.verify(handelToken, process.env.SECRET);
      req.body.createdBy = verifyToken.data.id;

      let createJob = await job.create(req.body);
      res.json({ data: createJob });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res) => {
    try {
      let token = req.headers.authorization;
      let handelToken = token.slice(7);

      let verifyToken = jwt.verify(handelToken, process.env.SECRET);
      let findUseJobrAndUpdata = await job.updateOne({
        createdBy: verifyToken.data.id,
      },req.body);

      res.json(findUseJobrAndUpdata);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  remove: async(req, res , next) => {
    try {
        let token = req.headers.authorization;
        let handelToken = token.slice(7);
  
        let verifyToken = jwt.verify(handelToken, process.env.SECRET);
        let removeJob = await job.findByIdAndRemove({
          _id: req.body.id,

        });
        if(removeJob == null) throw Error("Job not found");
        console.log(removeJob)
        res.json(removeJob);
      } catch (error) {
        next(error);
      } 
     },
};

module.exports = jobs;
