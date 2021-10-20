const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const TemporaryUserSchema = new mongoose.Schema({
                name: {
                    type: String,
                    required:true,
                },
                email: {
                    type: String,
                    unique: true,
                    required:true
                },
                password: {
                    type: String,
                    required:true,
                }
            },{
                timestamps:true
            }
)
TemporaryUserSchema.pre('save',async function(next){
    const temp=this;
   if(temp.isModified('password')){
        temp.password=await bcrypt.hash(temp.password,8);
    }
    next();
})

const TemporaryUser = new mongoose.model("Temporary User", TemporaryUserSchema);
module.exports = TemporaryUser;