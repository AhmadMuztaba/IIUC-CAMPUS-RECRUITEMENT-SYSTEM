const mongoose=require('mongoose');
const AlumniBlogCommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    blog:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'AlumniBlog'
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


const AlumniBlogComments=new mongoose.model('AlumniBlogComments',AlumniBlogCommentSchema);

module.exports=AlumniBlogComments;