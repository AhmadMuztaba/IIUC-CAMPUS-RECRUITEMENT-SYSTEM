const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Admin=require('../models/Admin');
require('dotenv').config();

const AdminAuth=async(req,res,next)=>{
    try{
        if(req.header('Authorization')===undefined){
            throw new Error('Authentication failed');
        }
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=await jwt.verify(token,process.env.ADMIN_TOKEN);
        if(!decoded){
            throw new Error('Authentication failed');
        }
        const admin=await Admin.findOne({_id:decoded._id,'tokens.token':token});
        if(!admin){
            throw new Error('Authentication failed');
        }
        req.user=admin;
        req.token=token;
        next();
    }catch(err){
        res.status(400).send({err:err.message});
    }
}
module.exports=AdminAuth;