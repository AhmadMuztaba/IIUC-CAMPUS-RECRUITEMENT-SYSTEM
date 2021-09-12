const mongoose=require('mongoose');
const ContestRankingSchema=new mongoose.Schema({
            first:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile'
            },
            second:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile'
            },
            third:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile'
            },
            date:{
                type:Date
            }
})
const ContestRanking=new mongoose.model('ContestRanking',ContestRankingSchema);
module.exports=ContestRanking;