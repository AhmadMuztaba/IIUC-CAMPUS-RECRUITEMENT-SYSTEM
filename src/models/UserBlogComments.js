const mongoose=require('mongoose');
const UserBlogcommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    blog:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'UserBlog'
    },
    userCommentMaker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    alumniCommentMaker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Alumni'
    }
},{
    timestamps:true
})

const UserBlogComments=new mongoose.model('UserBlogComments',UserBlogcommentSchema);

module.exports=UserBlogComments;