const Company=require('../models/Company');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const companyAuth=async(req,res,next)=>{
    try{
        if(req.header('Authorization')===undefined){
            throw new Error('Authentication failed');
        }
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=await jwt.decode(token,process.env.COMPANY_TOKEN);
        if(!decoded){
            throw new Error('Authentication failed');
        }
        const user=await Company.findOne({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error('Authentication failed');
        }
        req.user=user;
        req.token=token;
        next();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }
}

module.exports=companyAuth;