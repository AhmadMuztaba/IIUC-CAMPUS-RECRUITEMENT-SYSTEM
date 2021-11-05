const express=require('express');
const router=express.Router();
const Admin=require('../models/Admin');
const AdminAuth=require('../middleware/AdminAuth');
const TempAlumni=require('../models/TemporayAlumni');
const Alumni=require('../models/Alumni');
const TempCompany=require('../models/TemporaryCompany');
const User=require('../models/User');
const JobPost=require('../models/JobPost');
const Company=require('../models/Company');
const UserBlog = require('../models/UserBlog');
const AlumniBlog = require('../models/AlumniBlog');
const AlumniProfile=require('../models/AlumniProfile');
const CompanyProfile=require('../models/CompanyProfile');
const AlumniBlogComments=require('../models/AlumniBlogComments');
const UserBlogComments=require('../models/UserBlogComments');
const UserProfile=require('../models/UserProfile');
const {check,validationResult}=require('express-validator')
const ContestRanking=require('../models/ContestRankings');
const TemporaryUser=require('../models/TemporaryUser');
const axios=require('axios');


//me
router.get('/admin/me',AdminAuth,async(req,res)=>{
    try{
      res.status(200).send({admin:req.user});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//Admin SignUp
//verified
router.post('/signup/admin',[check('email','use valid email').isEmail(),
check('password','must be 6 characters password').isLength({min:6}),
check('name','name is required')
], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({err:errors.array()})
    }
    try {
        const {name,email,password}=req.body;
        const admin=new Admin({
            name:name,
            email:email,
            password:password
        });
        await admin.save();
        const token=await admin.authTok();
        res.status(201).send({admin,token});
    }catch(err){
        res.status(400).send({err:err.message});
    }
});

//Get contest Ranking
//not just for user
router.get('/contestRanking',async(req,res)=>{
    try{
        const ranks=await ContestRanking.find({}).populate({
            path:'first second third',
              populate:'user'
          }).exec();
        res.status(200).send(ranks);
    }catch(err){
        res.status(400).send({err:err.message})
    }
})
//edit contest ranking
router.patch('/constestRanking/:contestid',AdminAuth,async(req,res)=>{
    try{
        const {first,second,third,date,description}=req.body;
        const contest=await ContestRanking.findOne({_id:req.params.contestid});
        if(first){
            const firstUser=await User.findOne({email:first});
            if(!firstUser){
                throw new Error('User not found');
            }
            const firstUserProfile=await UserProfile.findOne({user:firstUser._id});
            if(!firstUserProfile){
                throw new Error('User Profile not found');
            }
            contest.first=firstUserProfile._id;
        }
        if(second){
            const secondUser=await User.findOne({email:second});
            if(!secondUser){
                throw new Error('User not found');
            }
        const secondUserProfile=await UserProfile.findOne({user:secondUser._id});
        if(!secondUserProfile){
            throw new Error('User Profile not found');
        }
            contest.second=secondUserProfile._id;
        }if(third){
            const thirdUser=await User.findOne({email:third});
            if(!thirdUser){
                throw new Error('User not found');
            }
            const thirdUserProfile=await UserProfile.findOne({user:thirdUser._id});
            if(!thirdUserProfile){
                throw new Error('User Profile not found');
            }
            contest.third=thirdUserProfile._id;
        }if(date){
            contest.date=date;
        }if(description){
            contest.description=description;
        }
        const ranks=await contest.save();
        res.status(201).json(ranks);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//Post Contest Ranking
//
router.post('/contestRanking',AdminAuth,async(req,res)=>{
    try{
        const {first,second,third,date,description}=req.body;
        if(!first||!second||!third||!date||!description){
            throw new Error('fist,second,third,date and description are needed');
        }
        const firstUser=await User.findOne({email:first});
        if(!firstUser){
            throw new Error('First User not found');
        }
        const firstUserProfile=await UserProfile.findOne({user:firstUser._id});
        if(!firstUserProfile){
            throw new Error('First User Profile not found');
        }
        const secondUser=await User.findOne({email:second});
        if(!secondUser){
            throw new Error('Second User not found');
        }
        const secondUserProfile=await UserProfile.findOne({user:secondUser._id});
        if(!secondUserProfile){
            throw new Error('Second User Profile not found');
        }
        const thirdUser=await User.findOne({email:third});
        if(!thirdUser){
            throw new Error('Third User not found');
        }
        const thirdUserProfile=await UserProfile.findOne({user:thirdUser._id});
        if(!thirdUserProfile){
            throw new Error('Third User Profile not found');
        }
        const ranking=new ContestRanking({
            first:firstUserProfile._id,
            second:secondUserProfile._id,
            third:thirdUserProfile._id,
            date:date,
            description:description
        })
        await ranking.save();
        res.status(201).send(ranking);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//Logout
//Get request
//verified
router.get('/admin/logout', AdminAuth, async (req, res) => {
    try {
        const currenttoken = req.token;
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== currenttoken;
        })
        await req.user.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//Logout All devices
//Get request
//verified
router.get('/admin/logoutAll', AdminAuth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//login
//verified
router.post('/login/admin',async(req,res)=>{
    try{
      const admin=await Admin.findByCredentials(req.body.email,req.body.password);
      const token=await admin.authTok();
      res.status(200).send({admin,token});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//all user list
//verified
router.get('/admin/all/users',AdminAuth,async(req,res)=>{
    try{
        let page=0;
        if(req.query.page){
            page=req.query.page;
        }
      const users=await User.find({}).limit(20).skip(page*20).sort({createdAt:1});
      res.status(200).send({users});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//all Alumni list
//verified
router.get('/admin/all/alumni',AdminAuth,async(req,res)=>{
    try{
        let page=0;
        if(req.query.page){
            page=req.query.page;
        }
      const alumni=await Alumni.find({}).limit(20).skip(page*20).sort({createdAt:1});
      res.status(200).send({alumni});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//all Company list
//verified
router.get('/admin/all/company',AdminAuth,async(req,res)=>{
    try{
        let page=0;
        if(req.query.page){
            page=req.query.page;
        }
      const company=await Company.find({}).limit(20).skip(page*20).sort({createdAt:1});
      res.status(200).send({company});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//search User
//verified
router.get('/admin/search/user',AdminAuth,async(req,res)=>{
    try{
      const search=req.query.search;
      const users=await User.find({name:new RegExp(search,'i')});
      if(users.length===0){
          throw new Error('no user found');
      }
      res.status(200).send({users});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//search Alumni
//verified
router.get('/admin/search/alumni',AdminAuth,async(req,res)=>{
    try{
      const search=req.query.search;
      const alumni=await Alumni.find({name:new RegExp(search,'i')});
      if(alumni.length===0){
          throw new Error('no alumni found');
      }
      res.status(200).send({alumni});
    }catch(err){
        console.log(err.message);
        res.status(400).send({err:err.message});
    }
})

//search Company
//verified
router.get('/admin/search/company',AdminAuth,async(req,res)=>{
    try{
      const search=req.query.search;
      const company=await Company.find({name:new RegExp(search,'i')});
      if(company.length===0){
          throw new Error('no Company found');
      }
      res.status(200).send({company});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//how many user's to accept

router.get('/temporary/user',AdminAuth,async(req,res)=>{
    try{
        const tempUsers=await TemporaryUser.find({}).select('-password');
        res.status(200).send(tempUsers);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//how many Alumnis to accept
//verified
router.get('/temporary/alumni',AdminAuth,async(req,res)=>{
    try{
       const tempAlumni=await TempAlumni.find({}).select('-password');
       res.status(200).send(tempAlumni);
    }catch(err){
        res.status(400).send({err:err.message})
    }
})

//how many Companies to accept
//verified
router.get('/temporary/company',AdminAuth,async(req,res)=>{
    try{
        const tempCompany=await TempCompany.find({}).select('-password');
        res.status(200).send(tempCompany);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//user's Id accept
router.get('/user/:id/yes/signup',AdminAuth,async(req,res)=>{
    try{
        const temp=await TemporaryUser.findOne({_id:req.params.id});
        const user=new User({
            name:temp.name,
            password:temp.password,
            email:temp.email
        });
        await user.save();
        await TemporaryUser.deleteOne({_id:req.params.id});
        res.status(201).send({user});
    }catch(err){
        res.status(400).send({ err: err.message });
    }
})


//users Id decline
router.get('/user/:id/No/signup',AdminAuth,async (req, res) => {
    try {
         await TemporaryUser.findByIdAndRemove(req.params.id);
         res.status(201).send();
    } catch (err) {
         res.status(400).send({ err: err.message });
    }
})

//Alumnis Id accept
//verified
router.get('/alumni/:id/yes/signup',AdminAuth,async (req, res) => {
    try {
         const temp=await TempAlumni.findOne({_id:req.params.id});
         const alumni=new Alumni({
             name:temp.name,
             password:temp.password,
             email:temp.email,
         });
         await alumni.save();
         await TempAlumni.deleteOne({_id:req.params.id});
         res.status(201).send({alumni});
    } catch (err) {
         res.status(400).send({ err: err.message });
    }
})

//alumni Id decline
router.get('/alumni/:id/No/signup',AdminAuth,async (req, res) => {
    try {
         await TempAlumni.findByIdAndRemove(req.params.id);
         res.status(201).send();
    } catch (err) {
         res.status(400).send({ err: err.message });
    }
})

//Company Id Accept
//verified
router.get('/company/:id/yes/signup',AdminAuth,async (req, res) => {
    try {
         const temp=await TempCompany.findOne({_id:req.params.id});
         const company=new Company({
             name:temp.name,
             password:temp.password,
             email:temp.email,
         });
         await company.save();
         await TempCompany.findByIdAndRemove(req.params.id);
         let temp1=company;
         temp1.password=undefined;
         temp1.tokens=undefined;
         res.status(201).send({company:temp1});
    } catch (err) {
         res.status(400).send({ err: err.message });
    }
})

//Company Id decline
//verified
router.get('/company/:id/No/signup',AdminAuth,async (req, res) => {
    try {
         await TempCompany.findByIdAndRemove(req.params.id);
         res.status(201).send();
    } catch (err) {
         res.status(400).send({ err: err.message });
    }
})

//All User blogs
//verified
router.get('/admin/UserBlog/all',AdminAuth,async(req,res)=>{
    try{
        let page=0;
        if(req.query.page){
            page=req.query.page;
        }
           const blogs=await UserBlog.find({}).limit(20).sort({createdAt:-1}).skip(page*20).populate('Author');
           res.status(200).send({blogs});
        }catch(err){
            res.status(400).send({err:err.message})
        }
})

//All Alumni blogs
//verified
router.get('/admin/AlumniBlog/all',AdminAuth,async(req,res)=>{
    try{
        let page=0;
        if(req.query.page){
            page=req.query.page;
        }
           const blogs=await AlumniBlog.find({}).limit(20).sort({createdAt:1}).skip(page*20).populate('Author');
           res.status(200).send({blogs});
        }catch(err){
            res.status(400).send({err:err.message})
        }
})

//user blog with Id
//verified
router.get('/admin/UserBlog/:id',AdminAuth,async(req,res)=>{
    try{
        const post=await UserBlog.findOne({_id:req.params.id}).populate('Author').exec();
        res.status(200).send(post);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//all job post
//verified
router.get('/admin/allJobs',AdminAuth,async(req,res)=>{
    try{
      let page=0;
      if(req.query.page){
          page=req.query.page;
      }
      const jobs=await JobPost.find({}).limit(10).skip(page*10).sort({createdAt:-1}).populate('Author').exec();
      res.status(200).send(jobs);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//view job with id
//verified
router.get('/admin/jobs/:id',AdminAuth,async(req,res)=>{
    try{
     const job=await JobPost.find({_id:req.params.id});
     if(!job){
         throw new Error('no jobs found');
     }
     res.status(200).send({job});
    }catch(err){
        res.status(400).send({err:error.message});
    }
})

//alumni blog with id
//verified
router.get('/admin/AlumniBlog/:id',AdminAuth,async(req,res)=>{
    try{
        const blog=await AlumniBlog.find({_id:req.params.id}).populate('Author').exec();
        res.status(200).send({blog});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})



//watching companyProfile
//verified
router.get('/admin/watch/company/profile/:id',AdminAuth,async(req,res)=>{
    try{
     const companyProfile=await CompanyProfile.findOne({company:req.params.id}).populate('company').exec();
     if(!companyProfile){
         throw new Error('Company didn\'t provide any info'); 
     }
     res.status(200).send({companyProfile});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//Watching User Profile
router.get('/admin/watch/user/profile/:id',AdminAuth,async(req,res)=>{
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

//watching AlumniProfile
//verified
router.get('/admin/watch/alumni/profile/:id',AdminAuth,async(req,res)=>{
    try{
    const alumniProfile=await AlumniProfile.findOne({alumni:req.params.id}).populate('alumni');
    if(!alumniProfile){
        throw new Error('Alumni didn\'t provide any info');
    }
    res.status(200).send({alumniProfile});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//see github repositories of an user
//verified
router.get('/admin/watch/user/profile/:id/githubRepos',AdminAuth, async (req, res) => {
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

//get codeforce rating of an user
router.get('/admin/watch/user/profile/:id/codeforceRatings',AdminAuth,async(req,res)=>{
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


//showing github repos of an alumni
//
router.get('/admin/watch/alumni/profile/:id/githubRepos',AdminAuth,async(req,res)=>{
    try {
        const user = await AlumniProfile.findOne({ alumni:req.params.id});
        const githubUserName = user.githubusername;
        const tok=process.env.GITHUB_ACCESS_TOKEN;
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
        console.log(err);
        res.status(400).send({ err: err.message });
    }
})

//showing codeforce rating of an alumni
//
router.get('/admin/watch/alumni/profile/:id/codeforceRatings',AdminAuth,async(req,res)=>{
    try{  
        const user=await AlumniProfile.findOne({alumni:req.params.id});
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


//delete User
//deletes everything(blog,comment,profile)
//verified
router.delete('/delete/admin/user/:id',AdminAuth,async(req,res)=>{
    try{
        const blog=await UserBlog.deleteMany({Author:req.params.id});
        const userblogcomment=await UserBlogComments.deleteMany({userCommentMaker:req.params.id});
        const alumnblogcomment=await AlumniBlogComments.deleteMany({userCommentMaker:req.params.id});
        const userProfile=await UserProfile.deleteOne({user:req.params.id});
        if(!userProfile){
            throw new Error('Profile can not be deleted' );
        }
       console.log('user profile deleted')
        const user=await User.deleteOne({_id:req.params.id});
        if(!user){
            throw new Error('user can not be deleted' );
        }
        res.status(200).send();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }
})

//delete Alumni Id
//verified
router.delete('/delete/admin/alumni/:id',AdminAuth,async(req,res)=>{
        try{
            const blog=await AlumniBlog.deleteMany({Author:req.params.id});
            const userblogcomment=await AlumniBlogComments.deleteMany({alumniCommentMaker:req.params.id});
            const alumnblogcomment=await AlumniBlogComments.deleteMany({alumniCommentMaker:req.params.id});
            const userProfile=await AlumniProfile.deleteOne({alumni:req.params.id});
            if(!AlumniProfile){
                throw new Error('Profile can not be deleted' );
            }
           console.log('user profile deleted')
            const user=await Alumni.deleteOne({_id:req.params.id});
            if(!user){
                throw new Error('user can not be deleted' );
            }
            res.status(200).send();
        }
        catch(err){
            res.status(400).send({err:err.message});
        }
})

//delete Company Id
//verified
router.delete('/delete/admin/company/:id',AdminAuth,async(req,res)=>{
    try{
        const jobPost=await JobPost.deleteMany({Author:req.params.id});
        const Profile=await CompanyProfile.deleteOne({company:req.params.id});
        if(!Profile){
            throw new Error('Profile can not be deleted' );
        }
       console.log('profile deleted')
        const company=await Company.deleteOne({_id:req.params.id});
        if(!company){
            throw new Error('company can not be deleted' );
        }
        res.status(200).send();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }
})


//delete User Blog
//verified
router.delete('/delete/admin/UserBlog/:id',AdminAuth,async(req,res)=>{
    try{
        const blog=await UserBlog.findOne({_id:req.params.id});
        if(!blog){
            throw new Error('not found');
        }
        const comment=await UserBlogComments.deleteMany({blog:blog._id});
        const deleteBlog=await UserBlog.deleteOne({_id:req.params.id});
        if(!deleteBlog){
            throw new Error('Not found');
        }
        res.status(200).send();
      }catch(err){
          res.status(400).send({err:err.message});
      }
})

//delete Alumni Blog
//verified
router.delete('/delete/admin/AlumniBlog/:id',AdminAuth,async(req,res)=>{
    try{
        const blog=await AlumniBlog.findOne({_id:req.params.id});
        if(!blog){
            throw new Error('not found');
        }
        const comment=await AlumniBlogComments.deleteMany({blog:blog._id});
        const deleteBlog=await AlumniBlog.deleteOne({_id:req.params.id});
        if(!deleteBlog){
            throw new Error('Not found');
        }
        res.status(200).send();
      }catch(err){
          res.status(400).send({err:err.message});
      }
})


//delete a job post
//verified
router.delete('/delete/admin/JobPost/:id',AdminAuth,async(req,res)=>{
    try{
      const job=await JobPost.deleteOne({_id:req.params.id});
      if(!job){
          throw new Error('can\'t be found');
      }
      res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

module.exports=router;