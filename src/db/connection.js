const mongoose = require('mongoose');
require('dotenv').config();

const connectDB=async(req,res)=>{
    try{
      const connect=await mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:true});
    if(connect){
      console.log('database connected');
    }
    }catch(err){
        console.log('database connection failed')
        res.status(500).send({err:"database connection failed"});
    }
}
module.exports=connectDB;