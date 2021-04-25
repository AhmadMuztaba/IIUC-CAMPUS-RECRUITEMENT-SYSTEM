const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const TemporaryAlumniSchema = new mongoose.Schema({
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
            },
            {
                timestamps:true
            }
)
TemporaryAlumniSchema.pre('save',async function(next){
    const temp=this;
   if(temp.isModified('password')){
        temp.password=await bcrypt.hash(temp.password,8);
    }
})

const TemporaryAlumni = new mongoose.model("Temporary Alumni", TemporaryAlumniSchema);
module.exports = TemporaryAlumni;