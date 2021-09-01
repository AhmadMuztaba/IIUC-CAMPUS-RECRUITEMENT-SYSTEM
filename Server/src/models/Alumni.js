const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const validator=require('validator');
const AlumniSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
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
    tokens:[
        {
            token:{
                type:String,
            }
        }
    ],
    passwordReset:{
        type:String,
    }
},{
    timestamps:true
})

AlumniSchema.virtual('AlumniReactionsAlumniBlog',{
    ref:'AlumniBlog',
    localField:'_id',
    foreignField:'React.alumni'
})

AlumniSchema.virtual('AlumniReactionsUserBlog',{
    ref:'UserBlog',
    localField:'_id',
    foreignField:'React.alumni'
})

AlumniSchema.virtual('UserBlogCommentsByAlumni',{
    ref:'UserBlogComments',
    localField:'_id',
    foreignField:'alumniCommentMaker'
})

AlumniSchema.virtual('AlumniBlogCommentsByAlumni',{
    ref:'AlumniBlogComments',
    localField:'_id',
    foreignField:'alumniCommentMaker'
})

AlumniSchema.methods.toJSON=function(req,res){
    const user=this;
    const userObject=user.toObject();
    delete userObject.tokens;
    delete userObject.password;
    return userObject;
}

AlumniSchema.statics.CheckCredentials=async(email,password)=>{
      const user=await Alumni.findOne({email:email});
      if(!user){
          throw new Error('Login Failed');
      }
      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
          throw new Error('Login Failed');
      }
      return user;
}

AlumniSchema.methods.getToken=async function(){
    const user=this;
    const token=await jwt.sign({_id:user.id},process.env.ALUMNI_TOKEN);
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
}
const Alumni=new mongoose.model('Alumni',AlumniSchema);
module.exports=Alumni;