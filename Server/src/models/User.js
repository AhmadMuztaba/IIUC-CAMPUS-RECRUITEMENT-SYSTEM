const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const validator=require('validator');
require('dotenv').config();
const UserSchema=new mongoose.Schema({
    email:{
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('use valid Email');
            }
        },
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    passwordReset:{
        type:String,
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
},{
    timestamps:true
})
UserSchema.pre('save',async function(next){
     const user=this;
     if(user.isModified('password')){
         user.password=await bcrypt.hash(user.password,8);
     }
     next();
})

UserSchema.virtual('AlumniBlogReaction',{
    ref:'AlumniBlog',
    localField:'_id',
    foreignField:'React.user'
})


UserSchema.virtual('UserBlogReaction',{
    ref:'UserBlog',
    localField:'_id',
    foreignField:'React.user'
})

UserSchema.virtual('AlumniBlogComments',{
    ref:'AlumniBlogComments',
    localField:'_id',
    foreignField:'userCommentMaker'
})

UserSchema.virtual('UserBlogComments',{
    ref:'UserBlogComments',
    localField:'_id',
    foreignField:'userCommentMaker',
})

UserSchema.virtual('Blogs',{
    ref:'UserBlog',
    localField:'_id',
    foreignField:'Author',
})

UserSchema.statics.findByCredetials=async(email,password)=>{
    const user=await User.findOne({email:email});
    if(!user){
        throw new Error('Credentials failed');
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Credentials failed');
    }
    return user;
}

UserSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

UserSchema.methods.getAuthToken=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},process.env.USER_TOKEN);
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
}

const User=new mongoose.model('User',UserSchema);
module.exports=User;