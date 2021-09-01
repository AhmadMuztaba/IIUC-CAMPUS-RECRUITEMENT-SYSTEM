const mongoose=require('mongoose');

const UserBlogSchema=new mongoose.Schema({
    title:{
        type:'String',
    },
    description:{
        type:'String'
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    React:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        alumni:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Alumni',
        }
    }],
    image:{
        type:Buffer
    }
},{
    timestamps:true
})

UserBlogSchema.virtual('UserBlogComments',{
    ref:'UserBlogComments',
    localField:'_id',
    foreignField:'blog'
})

const UserBlog=new mongoose.model('UserBlog',UserBlogSchema);
module.exports=UserBlog;