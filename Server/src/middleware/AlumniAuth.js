const jwt=require('jsonwebtoken');
const Alumni=require('../models/Alumni');
require('dotenv').config();
const AlumniAuth=async(req,res,next)=>{
    try{
        if(req.header('Authorization')===undefined){
            throw new Error('Authorization failed');
        }
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=await jwt.decode(token,process.env.ALUMNI_TOKEN);
        if(!decoded){
            throw new Error('Credential failed');
        }
        const user=await Alumni.findOne({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error('Credentials failed');
        }
        req.user=user;
        req.token=token;
        next();
    }catch(err){
        res.status(400).send({err:err.message});
    }
}
module.exports=AlumniAuth;