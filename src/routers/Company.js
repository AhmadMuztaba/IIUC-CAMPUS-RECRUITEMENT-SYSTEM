const express = require('express');
const axios=require('axios');
const router = new express.Router();
require('dotenv').config();
const Company = require('../models/Company');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const companyAuth = require('../middleware/companyAuth');
const TempCompany=require('../models/TemporaryCompany');
const JobPost=require('../models/JobPost');
const CompanyProfile = require('../models/CompanyProfile');
const sgMail=require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//forgot password
//have to send with the token that was sent via email
router.get('/comapany/forgotPassword',async(req,res)=>{
    try{
        const tok=req.query.forget;
        const decode=await jwt.decode({tok},process.env.FORGOT_PASSWORD);
        if(!decode){
            throw new Error('Sent the request again');
        }
        const user=await Company.findOne({_id:decode._id});
        if(!user){
            throw new Error('Sent the request again');
        }
        const token = await user.getAuthToken();
        res.status(200).send({company:user,token:token});
    }catch(err){
        res.status(400).send({err:err.message});
    }
   
})

//forgot-password
router.post('/company/forgotPassword',async(req,res)=>{
    try{
     const email=req.body.email;
     const user=await Company.findOne({email:email});
     if(!user){
         throw new Error('Create account first');
     }
     const token=await jwt.sign({_id:user.id},process.env.FORGOT_PASSWORD,{expiresIn:'1h'});
    user.passwordReset=token;
    await user.save();
     const msg = {
        to: `${user.email}`, // Change to your recipient
        from: 'a.m.ahmadmuztaba@gmail.com', // Change to your verified sender
        subject: 'Demo Project password reset',
        text: 'Don\'t forget your password ever again',
        html: `<a href='http://192.168.31.169:5000/user/forgetPassword/?forgot=${token}'>email</a>`,
      }
     const sent=await sgMail.send(msg);
     if(sent){
         console.log('email sent');
         res.status(200).send();
     }
    }
    catch(err){
   res.status(400).send({err:err.message});
    }
})

//me
//verified
router.get('/company/me',companyAuth,async(req,res)=>{
    try{
     res.status(200).send({company:req.user});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//signUp
//verified
router.post('/temporary/company/signup', async (req, res) => {
    try {
        const temp = new TempCompany(req.body);
       await temp.save();
        let temp1=temp;
        temp1.password=undefined;
        res.status(201).send({company:temp1});
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//login
//verified
router.post('/company/login', async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const user = await Company.findByCredential(email, password);
        if (!user) {
            throw new Error('Credential failed');
        }
        const token = await user.getAuth();
        res.status(200).send({
            company:user,
            token:token
        });
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
});

//logout
//verified
router.get('/company/logout',companyAuth,async(req,res)=>{
    try{
     const currenttoken=req.token;
     req.user.tokens=req.user.tokens.filter((token)=>{
         return token.token!==currenttoken;
     })
    await req.user.save();
    res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//logout all devices
//verified
router.get('/company/logoutAll',companyAuth,async(req,res)=>{
    try{
      req.user.tokens=[];
      await req.user.save();
      res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//postingJobs
//verified
router.post('/job/jobPost',companyAuth,async(req,res)=>{
    try{
      const job=new JobPost({
        ...req.body,
        Author:req.user._id,
      } 
    );
      await job.save();
      res.status(201).send(job);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//see who applied for the job
//verified
router.get('/job/:id/appliedUser',companyAuth,async(req,res)=>{
    try{
      const job=await JobPost.find({_id:req.params.id,Author:req.user._id}).populate({path:'appliedUsers',populate:{
          path:'user'
      }}).exec();
      res.status(200).send(job);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//jobs that a user have posted
//verified
router.get('/job/myJobsPost',companyAuth,async(req,res)=>{
    try{
        const job=await JobPost.find({Author:req.user._id}).populate({path:'appliedUsers',populate:{
            path:'user'
        }}).exec();
        res.status(200).send(job);
    }
    catch(err){
        console.log(err.message);
        res.status(400).send({err:err.message});
    }
})

//search All user with name
//verified
router.get('/company/search/user',companyAuth,async(req,res)=>{
    try{
      const user=await User.find({name:new RegExp(req.query.search,'i')});
      res.status(200).send({user});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//search for user with specific skills
//request should be localhost:3000/search/specificUser?skills[]=android&skills[]=web like this(user query-string to http request)
//verified
router.get('/search/specificUser', companyAuth, async (req, res) => {
    try {
        
        let match = [];
        match = req.query.skills;
        // if (req.query.skills) {
        //     match.skills = req.query.skills;
        // }
        // const user = await User.aggregate([{ $match: {skills:["web","code"]}}]).exec();

        //finding Users According to their skills
        const user = await UserProfile.find({ 'skills': { $in: match } }).populate('user');
        res.status(200).send({user});
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//see user profile of an specific user with id
//verified
router.get('/profile/:id',companyAuth,async(req,res)=>{
    try{
        const user=await UserProfile.findOne({user:req.params.id}).populate('user').exec();
        if(!user){
            throw new Error('didn\'t find the user');
        }
        res.status(200).send(user);
    }catch(err){
      res.status(400).send({err:err.message});
    }
})

//see github repositories of an user
//verified
router.get('/profile/:id/githubRepos', companyAuth, async (req, res) => {
    try {
        const user = await UserProfile.findOne({ user: req.params.id });
        if(!user.githubusername){
            throw new Error('User didn\'t provide github user name');
        }
        const githubUserName = user.githubusername;
        const tok=process.env.GITHUB_ACCESS_TOKEN
        const response = await axios.get(`https://api.github.com/users/${githubUserName}/repos`, {
            headers: {
                'Authorization': `token ${tok}`
            },
            params:{
                sort:{
                    'created':'asc'
                }
            }
        })
        const repository=response.data;
        res.status(200).send(repository);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//get codeforce rating
router.get('/profile/:id/codeforceRatings',companyAuth,async(req,res)=>{
    try{
        const user=await UserProfile.findOne({user:req.params.id});
        if(!user.codeforceusername){
            throw new Error('User didn\'t provide codeforce user name');
        }
        const response=await axios.get('https://codeforces.com/api/user.rating',{
            params:{
                handle:`${user.codeforceusername}`
            }
        });
        res.status(200).send(response.data);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//edit info
//verified
router.patch('/company', companyAuth, async (req, res) => {
    try {
        const toBeUpdated = Object.keys(req.body);
        const canBeUpdated = ['email', 'password', 'name'];
        const ok = toBeUpdated.every((data) => {
            return canBeUpdated.includes(data);
        })
        if (!ok) {
            throw new Error('please try again with the correct update credentials');
        }
        if(req.body.password){
         req.body.password=await bcrypt.hash(req.body.password,8);
        }
        toBeUpdated.forEach((data) => {
            req.user[data] = req.body[data];
        })
        await req.user.save();
        res.status(201).send({company:req.user});
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})

//edit job post
//verified
router.patch('/company/jobpost/:id',companyAuth,async(req,res)=>{
    try{
        const {title,description}=req.body
        const job=await JobPost.findOne({Author:req.user._id,_id:req.params.id});
        if(!job){
            throw new Error('no jobs found');
        }
        if(title){
         job.title=title;
        }
        if(description){
            job.description=description
        }
        await job.save();
        res.status(200).send(job);
    }catch(err){
        res.status(400).send({error:err.message})
    }
})


//delete job post
//verified
router.delete('/job/myJob/:id',companyAuth,async(req,res)=>{
    try{
        const job=await JobPost.findByIdAndRemove(req.params.id);
        if(!job){
            throw new Error('nothing to delete');
        }
        res.status(200).send();
    }catch(err){
      res.status(400).send({err:err.message});
    }
})

//delete everything(company)
//verified
router.delete('/company/me',companyAuth,async(req,res)=>{
    try{
        const jobPost=await JobPost.deleteMany({Author:req.user._id});
        const Profile=await CompanyProfile.deleteOne({company:req.user._id});
        if(!Profile){
            throw new Error('Profile can not be deleted' );
        }
       console.log('profile deleted')
        const company=await Company.deleteOne({_id:req.user._id});
        if(!company){
            throw new Error('company can not be deleted' );
        }
        res.status(200).send();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }
})

module.exports = router;