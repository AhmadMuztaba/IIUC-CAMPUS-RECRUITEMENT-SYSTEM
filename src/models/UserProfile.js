const mongoose = require('mongoose');
const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'User',
    },
    dateOfBirth:{
       type:Date
    },
    nationality:{
        type:String
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    skills: [String],
    bio: {
        type: String
    },
    githubusername: {
        type: String,
    },
    codeforceusername:{
        type:String,
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
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String
        }
    },
    profilePic:{
        type:Buffer
    },
}, {
    timestamps: true
})

const UserProfile = new mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;