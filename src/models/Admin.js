const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validator=require('validator');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('use valid Email');
            }
        },
    },
    password: {
        type: String,
        required:true
    },
    tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
},{
    timestamps:true
})
AdminSchema.pre('save', async function (req, res, next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
})

AdminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
        throw new Error('Credentials failed');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Credentials failed');
    }
    return admin;
}

AdminSchema.methods.authTok = async function () {
    const admin = this;
    const token = await jwt.sign({ _id: admin._id }, process.env.ADMIN_TOKEN);
    admin.tokens= admin.tokens.concat({ token});
    await admin.save();
    return token;
}

AdminSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;

