const jwt=require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config();
const auth=async(req,res,next)=>{
    try{
        if(req.header('Authorization')===undefined){
            throw new Error('Authentication failed');
        }
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=await jwt.verify(token,process.env.USER_TOKEN);
        if(!decoded){
           throw new Error('please Authenticate');
        }
       const user=await User.findOne({_id:decoded._id,'tokens.token':token});
       if(!user){
        throw new Error('please Authenticate');
       }
       req.user=user;
       req.token=token;
       next();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }   
}

module.exports=auth;