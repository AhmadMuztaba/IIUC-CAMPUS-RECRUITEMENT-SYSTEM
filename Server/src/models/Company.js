const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const validator=require('validator');
const  CompanySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('use valid Email');
            }
        },
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ],
    passwordReset:{
        type:String,
    }
},
{timestamps:true})

CompanySchema.methods.toJSON=function(){
    const companyUser=this;
    const companyUserObject=companyUser.toObject();
    delete companyUserObject.password;
    delete companyUserObject.tokens;
    return companyUserObject;
}

CompanySchema.statics.findByCredential=async (email,password)=>{
   const companyUser=await Company.findOne({email:email});
   if(!companyUser){
       throw new Error('Credential failed');
   }
   const isMatch=await bcrypt.compare(password,companyUser.password);
   if(!isMatch){
    throw new Error('Credential failed');
   }
  return companyUser;
}
CompanySchema.methods.getAuth=async function(){
    const companyUser=this;
    const token=await jwt.sign({_id:companyUser._id},process.env.COMPANY_TOKEN);
    companyUser.tokens=companyUser.tokens.concat({token});
    await companyUser.save();
    return token;
}

const Company=new mongoose.model('Company',CompanySchema);
module.exports=Company;