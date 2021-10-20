require('dotenv').config();
const express = require('express');
const router = new express.Router();
const multer=require('multer');
const sharp=require('sharp');
const UserBlog = require('../models/UserBlog');
const User = require('../models/User');
const Alumni = require('../models/Alumni');
const AlumniBlog=require('../models/AlumniBlog');
const AlumniBlogComments=require('../models/AlumniBlogComments');
const UserBlogComments = require('../models/UserBlogComments');
const CompanyProfile=require('../models/CompanyProfile');
const AlumniProfile=require('../models/AlumniProfile');
const JobPost=require('../models/JobPost');
const auth = require('../middleware/auth');
const UserProfile = require('../models/UserProfile');
const jwt=require('jsonwebtoken');
const axios=require('axios');
const {check,validationResult}=require('express-validator');
const sgMail=require('@sendgrid/mail');
const TemporaryUser=require('../models/TemporaryUser');
const bcrypt=require('bcrypt');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var emailRoute=process.env.FORGOT_EMAIL_USER_ROUTE;
//me
//verified
router.get('/user/me',auth,async(req,res)=>{
    try{
        const user=req.user;
     res.status(200).send({user});
    }catch(err){
     res.status(400).send({err:err.message});
    }
})


//Logout
//Get request
//verified
router.get('/user/logout', auth, async (req, res) => {
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
router.get('/user/logoutAll', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

/*The Blog Post that user Posted*/
//Activity Log
/*GET*/
//verified
router.get('/posts/me', auth, async (req, res) => {
    try {
        const user = req.user;
        await user.populate('Blogs').execPopulate();
        res.status(200).send(user.Blogs);
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})

//all comments by user in alumni blog
//Activity log
//verified
router.get('/me/Allcomments/AlumniBlog', auth, async (req, res) => {
    try {
        const comments = await req.user.populate({path:'AlumniBlogComments',
        populate:{
            path:'blog'
        }}).execPopulate();
        if(!comments){
            throw new Error('no comments found');
        }
        res.status(200).send(comments.AlumniBlogComments);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})
//All comments by and User in the user blog
//Activity log
//verified
router.get('/me/Allcomments/UserBlog', auth, async (req, res) => {
    try {
        const comments = await req.user.populate(
            {
                path:'React.user React.alumni',
                path:'UserBlogComments',
                populate:{
                path:'blog',
             }}).execPopulate();
        if(!comments){
            throw new Error('no comments found');
        }
        res.status(200).send(comments.UserBlogComments);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//find all User blogs
//verified
router.get('/blog/user/all/user',auth,async(req,res)=>{
    try{
    let page=0;
    if(req.query.page){
        page=req.query.page;
    }
       const blogs=await UserBlog.find({}).populate('Author').limit(10).sort({createdAt:-1}).skip(page*10);
       res.status(200).send({blogs});
    }catch(err){
        res.status(400).send({err:err.message})
    }
})

//find User Blog with BlogId
//here id=blogId
//verified
router.get('/blog/user/:id/user',auth,async(req,res)=>{
    try{
        const blog=await UserBlog.findOne({_id:req.params.id});
        await blog.populate({
             path:'comments',
             populate:'userCommentMaker alumniCommentMaker',
             populate:'React.user React.alumni'
         }).execPopulate();
        res.status(200).send({
            blog:blog,
            comments:blog.comments});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//all comments in the user blog
//verified
router.get('/blog/user/:id/allComments/user',auth,async(req,res)=>{
    try{
      const blog=await UserBlog.findOne({_id:req.params.id});
      if(!blog){
          throw new Error('not found');
      }
      const comments=await UserBlogComments.find({blog:blog._id}).sort({'createdAt':'-1'}).populate('userCommentMaker alumniCommentMaker').exec();
    //    if(comments.length===0){
    //        throw new Error('no comments found');
    //    }
       res.status(200).send(comments);
    }catch(err){
        console.log(err.message)
        res.status(400).send({err:err.message});
    }
})

//all comments in the Alumniblog
//verified
router.get('/blog/alumni/:id/allComments/user',auth,async(req,res)=>{
    try{
      const blog=await AlumniBlog.findOne({_id:req.params.id});
      if(!blog){
          throw new Error('not found');
      }
      const comments=await AlumniBlogComments.find({blog:blog._id}).sort({'createdAt':'-1'}).populate('userCommentMaker alumniCommentMaker').exec();
       if(comments.length===0){
           throw new Error('no comments found');
       }
       res.status(200).send(comments);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//find All Alumni Blogs
//verified
router.get('/blog/alumni/all/user',auth,async(req,res)=>{
    try{
    let page=0;
    if(req.query.page){
        page=req.query.page;
    }
       const blogs=await AlumniBlog.find({}).limit(10).sort({createdAt:1}).skip(page*10).populate('Author');
       res.status(200).send({blogs});
    }catch(err){
        res.status(400).send({err:err.message})
    }
})

//find Alumni Blog with blogId
//id=blogId
//verified
router.get('/blog/alumni/:id/user',auth,async(req,res)=>{
    try{
        const blog=await AlumniBlog.findOne({_id:req.params.id});
        await blog.populate({
           path:'comments',
             populate:'userCommentMaker alumniCommentMaker'
         }).execPopulate();
        res.status(200).send({
            blog:blog,
            comments:blog.comments});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})
//showing codeforce rating of another user
router.get('/user/watch/user/cfrating/:id',auth,async(req,res)=>{
    try{  
        const user=await AlumniProfile.findOne({user:req.params.id});
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


//showing github repos of another user
router.get('/user/watch/user/githubrepo/:id',auth,async(req,res)=>{
    try {
        const user = await UserProfile.findOne({ user:req.params.id});
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

//showing github repos of an alumni
//verified
router.get('/user/watch/alumni/githubrepo/:id',auth,async(req,res)=>{
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
//verified
router.get('/user/watch/alumni/cfrating/:id',auth,async(req,res)=>{
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

//showing codeforce user info of alumni
//verified
router.get('/user/watch/alumni/cfInfo/:id',auth,async(req,res)=>{
    try{  
        const user=await AlumniProfile.findOne({alumni:req.params.id});
        if(!user.codeforceusername){
            throw new Error('User didn\'t provide codeforce user name');
        }
        const response=await axios.get('https://codeforces.com/api/user.info',{
            params:{
                handles:`${user.codeforceusername}`
            }
        });
        res.status(200).send(response.data);
    }catch(err){
        res.status(400).send({err:err.response.data});
    }
})

//Codeforce All problem Set
router.get('/user/codeforceAllProblemSet',auth,async(req,res)=>{
    try{
        const response=await axios.get('https://codeforces.com/api/problemset.problems?tags=implementation');
        res.status(200).send(response.data);
    }catch(err){
        res.status(400).send({err:err.response.data});
    }
})

//watching User Profile
//id=userid
router.get('/profile/watch/user/:id',auth,async(req,res)=>{
    try{
        const user=await UserProfile.findOne({user:req.params.id}).select('-profilePic').populate('user').exec();
        if(!user){
            throw new Error('No user Found');
        }
        res.status(200).send(user);
    }catch(err){
        res.status(400).send({err:err.message})
    }
})

//watching AlumniProfile
//verified
router.get('/profile/watch/alumni/:id',auth,async(req,res)=>{
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

//watching companyProfile
//verified
router.get('/profile/watch/company/:id',auth,async(req,res)=>{
    try{
     const companyProfile=await CompanyProfile.findOne({company:req.params.id}).populate('company');
     if(!companyProfile){
         throw new Error('Company didn\'t provide any info'); 
     }
     res.status(200).send({companyProfile});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})
//my applied jobs
router.get('/my/appliedjobs',auth,async(req,res)=>{
    try{
        const jobs=await JobPost.find({'appliedUsers.user':req.user._id}).populate('Author').select('-appliedUsers').exec();
        res.status(200).send(jobs);
    }catch(err){
        res.status({err:err.message});
    }
})



//find All Jobs
//verified
router.get('/allJobs',auth,async(req,res)=>{
    try{
        let page=0;
        if(req.query.page){
            page=req.query.page;
        }
    const job=await JobPost.find().limit(20).skip(page*20).sort({createdAt:1}).populate({
        path:'Author',
    }).exec();
    if(!job){
        throw new Error('No jobs found');
    }
    res.status(200).send(job);
    }catch(err){
      res.status(400).send({err:err.message});
    }
})


//forgot password
//have to send with the token that was sent via email
router.get('/user/forgotPassword',async(req,res)=>{
    try{
        const tok=req.query.forget;
        const decode=await jwt.verify(tok,process.env.FORGOT_PASSWORD);
        if(!decode){
            throw new Error('Sent the request again');
        }
        const user=await User.findOne({_id:decode._id});
        if(!user){
            throw new Error('Sent the request again');
        }
        const token = await user.getAuthToken();
        res.status(200).send({user,token});
    }catch(err){
        res.status(400).send({err:err.message});
    }
   
})

//forgot-password
router.post('/user/forgotPassword',async(req,res)=>{
    try{
     const email=req.body.email;
     const user=await User.findOne({email:email});
     if(!user){
         throw new Error('Create account first');
     }
     const token=await jwt.sign({_id:user.id},process.env.FORGOT_PASSWORD,{expiresIn:'1h'});
    user.passwordReset=token;
    await user.save();
     const msg = {
        to: `${user.email}`, // Change to your recipient
        from: process.env.VERIFIED_SENDER, // Change to your verified sender
        subject: 'IIUC Campus Recruitement System password reset',
        text: 'Don\'t forget your password ever again',
        html: `<a href='${emailRoute}/${token}'>email</a>`,
      }
     const sent=await sgMail.send(msg);
     if(sent){
         res.status(200).send('email sent');
     }
    }
    catch(err){
res.status(400).send({err:err.message});
    }
})

//SignUp User
//verified
router.post('/user/signUp',[check('email','Email is required').isEmail(),
check('name','name is required').not().isEmpty(),
check('password','minimum 6 letters password required').isLength({min:6})
 ],async (req, res) => {
     const errors=validationResult(req);
     if(!errors.isEmpty()){
         res.status(400).json({err:errors.array()})
     }
    try {
        const {name,email,password}=req.body;
        const user=new TemporaryUser({
            name:name,
            email:email,
            password:password
        })
        await user.save();
        // const msg = {
        //     to: `${user.email}`, // Change to your recipient
        //     from: 'a.m.ahmadmuztaba@gmail.com', // Change to your verified sender
        //     subject: 'New Account creater for this account',
        //     text: 'welcome',
        //   }
        //  const sent=await sgMail.send(msg);
        //  if(!sent){
        //     console.log('mail can\'t be sent');
        // }
        res.status(201).send('Your request has been transferred to the admin');
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send({ err: err.message });
    }
})


//LoginUser
//verified
router.post('/user/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredetials(email, password);
        const token = await user.getAuthToken();
        res.status(200).send({ user, token });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ err: err.message });
    }
})

let upload=multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png||jpeg||jpg)$/)){
            cb(new Error('file must be image'));
        }
        cb(undefined,true);
    }
})
//Post a blog
//verified
router.post('/blog/user', auth,upload.single('blogPic'),async (req, res) => {
    try {
        if(!req.body.title){
            throw new Error('Title Required');
        }
        if(!req.body.description){
            throw new Error('description Required');
        }
        if(req.file===undefined){
            throw new Error('Image is Required');
        }
        if(req.file!==undefined){
            const pic=await sharp(req.file.buffer).png().resize({height:300,width:300}).toBuffer();
            const blog = new UserBlog({
                ...req.body,
                image:pic,
                Author: req.user._id
            });
            await blog.save();
            res.status(201).send(blog);
        }
        // else if(req.file==undefined){
        //     const blog = new UserBlog({
        //         ...req.body,
        //         Author: req.user._id
        //     });
        //     await blog.save();
        //     res.status(201).send(blog);
        // }
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ err: err.message });
    }
})

//post comment in the UserBlog 
//here Id=UserBlog Id
//verified
router.post('/blog/user/:id/usercomment', auth, async (req, res) => {
    try {
        let newcomment = new UserBlogComments({
            ...req.body,
            blog: req.params.id,
            userCommentMaker: req.user._id
        })
        await newcomment.save();
        const comment=await UserBlogComments.findOne({_id:newcomment._id}).populate('userCommentMaker');
        res.status(201).send(comment);
    } catch (err) {
        console.log(err);
        res.status(400).send({ err: err.message });
    }
})

//React in a User Blog
//here id=UserBlogId
router.post('/blog/user/:id/React',auth,async(req,res)=>{
    try{
        const user=req.user;
        const blog=await UserBlog.findOne({_id:req.params.id}).select('-image');
        const userreact=await UserBlog.findOne({_id:blog._id,'React.user':req.user._id}).select('-image');
        if(!userreact){
            blog.React=blog.React.concat({user:user._id});
            await blog.save();
        }else{
               blog.React=blog.React.filter((data)=>{
                if(data.alumni){
                    return data;
                }
               return(data.user._id.toString()!==req.user._id.toString())
            })
            await blog.save();
        }
        const newblog=await UserBlog.findOne({_id:req.params.id}).select('-image').populate({
        path:'React.user React.alumni'
        }).exec();
        res.status(200).send(newblog);
    }catch(err){
        console.log(err.message);
        res.status(400).send({err:err.message});
    }
})


//React in a Alumni Blog
router.post('/blog/alumni/:id/react',auth,async(req,res)=>{
    try{
        const user=req.user;
        const blog=await AlumniBlog.findOne({_id:req.params.id}).select('-image');
        const userreact=await AlumniBlog.findOne({_id:blog._id,'React.user':req.user._id}).select('-image');
        if(!userreact){
            blog.React=blog.React.concat({user:user._id});
            await blog.save();
        }else{
            blog.React=blog.React.filter((data)=>{
                if(data.alumni){
                    return data;
                }
               return(data.user._id.toString()!==req.user._id.toString())
            })
            await blog.save();
        }
        const newblog=await AlumniBlog.findOne({_id:req.params.id}).select('-image').populate({
        path:'React.user React.alumni'
        }).exec();
        res.status(200).send(newblog);
    }catch(err){
        console.log(err.message);
        res.status(400).send({err:err.message});
    }
})



//post comment in the Alumni Blog
//id=AlumniBlogId
//verified
router.post('/blog/Alumni/:id/usercomment', auth, async (req, res) => {
    try {
        let newcomment = new AlumniBlogComments({
            ...req.body,
            blog: req.params.id,
            userCommentMaker: req.user._id
        })
        await newcomment.save();
        const comment=await AlumniBlogComments.findOne({_id:newcomment._id}).populate('userCommentMaker');
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//Apply for a job
//id=Job Id
//verified
router.post('/job/user/:id',auth,async(req,res)=>{
    try{
        const job=await JobPost.findOne({_id:req.params.id});
        if(!job){
            throw new Error('no jobs found');
        }
        job.appliedUsers.map((user)=>{
            if(req.user._id.toString()===user.user._id.toString()){
                throw new Error('already exist');
            }
        })
        job.appliedUsers=job.appliedUsers.concat({user:req.user._id});
        await job.save();
        res.status(201).send(job);
    }catch(err){
        console.log(err.message);
        res.status(400).send({err:err.message});
    }
})

//chaging password
//verified
router.patch('/user/me/passwordChange',auth,async(req,res)=>{
    try{
      let user=req.user;
      if(req.body.password && req.body.password.length>=6){
        req.body.password=await bcrypt.hash(req.body.password,8);
        user.password=req.body.password;
        await user.save();
        res.status(200).send({user});
       }else{
           res.status(400).send('password didn\'t change');
       }
    }catch(err){
         res.status(400).send({err:err.message});
    }
})

//changing Info
//verified
router.patch('/user/me', auth, async (req, res) => {
    try {
        let user = req.user;
        const canBeUpdated = ['email', 'name'];
        const toUpdate = Object.keys(req.body);
        const updateOkay = toUpdate.every((value) => {
            return canBeUpdated.includes(value);
        })
        if (!updateOkay) {
            throw new Error('update fields not okay');
        }
        toUpdate.forEach((update) => {
            user[update] = req.body[update];
        })
        await user.save();
        res.status(200).send({user});
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//changing User Blog
//verified
router.patch('/blog/user/:id', auth,upload.single('blogPic'),async (req, res) => {
    try {
        const {title,description}=req.body;
        if(req.file!==undefined){
            const pic=await sharp(req.file.buffer).png().resize({height:500,width:500}).toBuffer();
            const blog= await UserBlog.findOne({Author:req.user._id,_id:req.params.id});
            blog.image=pic;
            if(title){
                blog.title=title;
            }
            if(description){
                blog.description=description;
            }
            await blog.save();
            res.status(201).send(blog);
        }
        else if(req.file===undefined){
            const blog= await UserBlog.findOne({Author:req.user._id,_id:req.params.id});
            if(title){
                blog.title=title;
            }
            if(description){
                blog.description=description;
            }
            await blog.save();
            res.status(201).send(blog);
        }
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//edit comment in the user blog
//verified
router.patch('/blog/userBlog/user/comment/:id',auth,async(req,res)=>{
    try{
   const comment=await UserBlogComments.findOne({_id:req.params.id,userCommentMaker:req.user._id});
   if(!comment){
       throw new Error('can\'t be found');
   }
   if(req.body.comment){
       comment.comment=req.body.comment;
       await comment.save();
   }

   res.status(200).send(comment);
    }
    catch(err){
res.status(400).send({err:err.message});
    }
})

//edit comment in the alumni blog
//verified
router.patch('/blog/AlumniBlog/user/comment/:id',auth,async(req,res)=>{
    try{
   const comment=await AlumniBlogComments.findOne({_id:req.params.id,userCommentMaker:req.user._id});
   if(!comment){
       throw new Error('can\'t be found');
   }
   if(req.body.comment){
       comment.comment=req.body.comment;
       await comment.save();
   }

   res.status(200).send(comment);
    }
    catch(err){
res.status(400).send({err:err.message});
    }
})


//delete Profile
//verified
router.delete('/user/me',auth,async(req,res)=>{
    try{
        const blog=await UserBlog.deleteMany({Author:req.user._id});
        const userblogcomment=await UserBlogComments.deleteMany({userCommentMaker:req.user._id});
        const alumnblogcomment=await AlumniBlogComments.deleteMany({userCommentMaker:req.user._id});
        const userProfile=await UserProfile.deleteOne({user:req.user._id});
        if(!userProfile){
            throw new Error('Profile can not be deleted' );
        }
       console.log('user profile deleted')
        const user=await User.deleteOne({_id:req.user._id});
        if(!user){
            throw new Error('user can not be deleted' );
        }
        res.status(200).send();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }
})

//UserBlog delete
//id=blogid
//verified
router.delete('/user/me/userBlog/:id',auth,async(req,res)=>{
    try{
      const blog=await UserBlog.findOne({Author:req.user._id,_id:req.params.id});
      if(!blog){
          throw new Error('not found');
      }
      const comment=await UserBlogComments.deleteMany({blog:blog._id});
      const deleteBlog=await UserBlog.deleteOne({Author:req.user._id,_id:req.params.id});
      if(!deleteBlog){
          throw new Error('Not found');
      }
      res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


// own AlumniBlogCommentDelete
//id=commentId
//verified
router.delete('/user/me/AlumniBlogcomment/:id',auth,async(req,res)=>{
    try{
      const test=await AlumniBlogComments.findOne({userCommentMaker:req.user._id,_id:req.params.id});
      const comment=await AlumniBlogComments.deleteOne({userCommentMaker:req.user._id,_id:req.params.id});
      if(!test){
          throw new Error('no comments found');
      }
      res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//own userBlogComment Delete
//id=commentId
//verified
router.delete('/user/me/userBlogcomment/:id',auth,async(req,res)=>{
    try{
        const test=await UserBlogComments.findOne({userCommentMaker:req.user._id,_id:req.params.id})
      const comment=await UserBlogComments.deleteOne({userCommentMaker:req.user._id,_id:req.params.id});
      if(!test){
          throw new Error('no comments found');
      }
      res.status(200).send(comment);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//delete others comment created in his post
//verified
router.delete('/user/me/:blogId/userBlogComment/:id',auth,async(req,res)=>{
    try{
       const blog=await UserBlog.findOne({_id:req.params.blogId,Author:req.user._id});
       if(!blog){
           console.log('blog can\'t be deleted');
       }
       const test=await UserBlogComments.findOne({_id:req.params.id,blog:blog._id})
       const comment=await UserBlogComments.deleteOne({_id:req.params.id,blog:blog._id});
       if(!test){
            throw new Error('not found');
        }
        res.status(200).send();
       }catch(err){
        res.status(400).send({err:err.message});
    }
})

module.exports = router;