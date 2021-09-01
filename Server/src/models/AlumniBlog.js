const mongoose=require('mongoose');
const AlumniBlogSchema=new mongoose.Schema({
    title:{
        type:'String',
    },
    description:{
        type:'String'
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Alumni',
    },
    image:{
        type:Buffer
    },
    React:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        alumni:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Alumni'
        }
    }
    ]
},{
    timestamps:true
})

AlumniBlogSchema.virtual('AlumniBlogComments',{
    ref:'AlumniBlogComments',
    localField:'_id',
    foreignField:'blog'
})

const AlumniBlog=new mongoose.model('AlumniBlog',AlumniBlogSchema);
module.exports=AlumniBlog;