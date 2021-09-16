const mongoose=require('mongoose');
const ContestRankingSchema=new mongoose.Schema({
            first:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile',
                required:true
            },
            second:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile',
                required:true
            },
            third:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile',
                required:true
            },
            description:{
                type:String
            },
            date:{
                type:Date,
                required:true
            }
})
const ContestRanking=new mongoose.model('ContestRanking',ContestRankingSchema);
module.exports=ContestRanking;