const mongoose = require('mongoose');
const JobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    appliedUsers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }

    ]
},{
    timestamps:true
})

const JobPost = new mongoose.model('JobPost', JobPostSchema);
module.exports = JobPost;