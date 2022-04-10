const jobs = {
    getAll:(req ,res)=>{
        res.json({data:"get All"});
    },
    userProfile:(req ,res)=>{
        res.json({data:"get AuserProfilell"});
    },
    create:(req ,res)=>{
        res.json({data:"get create"});
    },
    update:(req ,res)=>{
        res.json({data:"get All"});
    },
    remove:(req ,res)=>{
        res.json({data:"get update"});
    }
};

module.exports = jobs;