const mongoose=require('mongoose');

const AlumniProfileSchema=new mongoose.Schema({
    alumni:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Alumni',
        unique:true,
    },
    status:{
        type:String
    },
    passingYear:{
       type:String,
    },
    currentJob:{
       type:String,
    },
    about:{
        type:String,
    },
    githubusername: {
        type: String,
    },
    codeforceusername:{
        type:String,
    },
    website:{
        type:String
    },
    experience: [
        {
            title: {
                type: String,
            },
            company: {
                type: String,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
            current: {
                type: String,
            },
            description: {
                type: String,
            }
        }
    ],
    
    education: [
        {
            school: {
                type: String,
            },
            college: {
                type: String,
            },
            university: {
                type: String
            },
            fieldOfStudy: {
                type: String,
            },
            BscPassingYear: {
                type: String
            },
            description: {
                type: String,
            }
        }
    ],

    social:{
        facebook:{
            type:String,
        },
        instagram:{
            type:String,
        },
        twitter:{
            type:String,
        },
        youtube:{
            type:String,
        },
        linkedin:{
            type:String
        }
    },
    profilePic:{
        type:Buffer
    },
},{timestamps:true});

const AlumniProfile=new mongoose.model('AlumniProfile',AlumniProfileSchema);
module.exports=AlumniProfile;