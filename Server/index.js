const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./src/db/connection');
connectDB();
const User=require('./src/routers/User');
const UserProfile=require('./src/routers/UserProfile');
const Company=require('./src/routers/Company');
const CompanyProfile=require('./src/routers/CompanyProfile');
const Alumni=require('./src/routers/Alumni');
const AlumniProfile=require('./src/routers/AlumniProfile');
const Admin=require('./src/routers/Admin');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const host = '0.0.0.0';
const port = process.env.PORT || 5000;

app.use(User);
app.use(UserProfile);
app.use(Company);
app.use(CompanyProfile);
app.use(Alumni);
app.use(AlumniProfile);
app.use(Admin);

app.listen(port,host,()=>{
    console.log("port connected to "+port);
})