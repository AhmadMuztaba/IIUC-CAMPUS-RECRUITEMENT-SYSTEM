const express = require('express');
const router = new express.Router();
require('dotenv').config();
const bcrypt=require('bcrypt');
const multer=require('multer');
const sharp=require('sharp');
const Alumni = require('../models/Alumni');
const AlumniAuth = require('../middleware/AlumniAuth');
const Comments = require('../models/UserBlogComments');
const UserBlog = require('../models/UserBlog');
const AlumniBlog = require('../models/AlumniBlog');
const TempAlumni = require('../models/TemporayAlumni');
const AlumniBlogComments = require('../models/AlumniBlogComments');
const UserBlogComments=require('../models/UserBlogComments')
const User=require('../models/User');
const UserProfile=require('../models/UserProfile');
const AlumniProfile = require('../models/AlumniProfile');
const sgMail=require('@sendgrid/mail');
const axios=require('axios');
const ContestRanking=require('../models/ContestRankings');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//forgot password
//have to send with the token that was sent via email
router.get('/alumni/forgotPassword',async(req,res)=>{
    try{
        const tok=req.query.forget;
        const decode=await jwt.decode({tok},process.env.FORGOT_PASSWORD);
        if(!decode){
            throw new Error('Sent the request again');
        }
        const alumni=await Alumni.findOne({_id:decode._id});
        if(!alumni){
            throw new Error('Sent the request again');
        }
        const token = await alumni.getAuthToken();
        res.status(200).send({alumni,token});
    }catch(err){
        res.status(400).send({err:err.message});
    }
   
})

//forgot-password
router.post('/company/forgotPassword',async(req,res)=>{
    try{
     const email=req.body.email;
     const user=await Alumni.findOne({email:email});
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

//own profile
//verified
router.get('/alumni/me',AlumniAuth,async(req,res)=>{
    try{
      res.status(200).send({alumni:req.user});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//search All user with name
//verified
router.get('/search/user',AlumniAuth,async(req,res)=>{
    try{
      const user=await User.find({name:new RegExp(req.query.search,'i')});
      res.status(200).send({user});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//watching users profile
//id=userId
//verified
router.get('/alumni/watch/user/:id',AlumniAuth,async(req,res)=>{
    try{
    const user=await UserProfile.findOne({user:req.params.id}).select('-profilePic').populate('user').exec();
    if(!user){
        throw new Error('User haven\'t created a profile yet');
    }
    res.status(200).send({user});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//showing github repos of an user
router.get('/alumni/watch/user/:id/github',AlumniAuth,async(req,res)=>{
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

//showing codeforce rating of an user
router.get('/alumni/watch/user/:id/cfRatings',AlumniAuth,async(req,res)=>{
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

//showing codeforce user info
//verified
router.get('/alumni/watch/user/:id/cfInfo',AlumniAuth,async(req,res)=>{
    try{  
        const user=await UserProfile.findOne({user:req.params.id});
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

//watch reputaion of an user
router.get('/alumni/watch/user/:userId/reputation',AlumniAuth,async(req,res)=>{
    try{
        const profile=await UserProfile.findOne({user:req.params.userId});
        const first=await ContestRanking.countDocuments({first:profile._id});
        const second=await ContestRanking.countDocuments({second:profile._id});
        const third=await ContestRanking.countDocuments({third:profile._id});
        const total=(first*30)+(second*20)+(third*10);
        res.status(200).json(total);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})



//All Alumni Blog
//verified
router.get('/blog/alumni/all/alumni',AlumniAuth,async(req,res)=>{
    try{
    let page=0;
    if(req.query.page){
        page=req.query.page;
    }
       const blogs=await AlumniBlog.find({}).populate({
           path:'Author'
       }).limit(10).sort({createdAt:-1}).skip(page*10);
       res.status(200).send({blogs});
    }catch(err){
        res.status(400).send({err:err.message})
    }
})

//Alumni Blog by id
//here Id=blogId
//verified
router.get('/blog/alumni/:id/alumni', AlumniAuth, async (req, res) => {
    try {
        const blog = await AlumniBlog.findOne({ _id: req.params.id });
        await blog.populate({
            path: 'comments',
            populate: 'userCommentMaker alumniCommentMaker',
            populate:'React.user React.alumni'
        }).execPopulate();
        res.status(200).send({
            blog: blog,
            comments: blog.comments
        });
    } catch (err) {
        res.status(400).send({err:err.message});
    }
})



//logout
//verified
router.get('/alumni/logout', AlumniAuth, async (req, res) => {
    try {
        const user = req.user;
        const token = req.token;
        user.tokens = user.tokens.filter((tok) => tok.token !== token);
        await user.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//logout all
//verified
router.get('/alumni/logoutall',AlumniAuth,async(req,res)=>{
    try{
       req.user.tokens=[];
       await req.user.save();
       res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//searching all Alumni Blog
//verified
router.get('/blog/user/all/alumni',AlumniAuth,async(req,res)=>{
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


//search an user blog with blog Id
//id=blog id
//verified
router.get('/blog/user/:id/alumni', AlumniAuth, async (req, res) => {
    try {
        const blog = await UserBlog.findOne({ _id: req.params.id });
        await blog.populate({
            path: 'comments',
            populate: 'userCommentMaker alumniCommentMaker',
            populate:'React.user React.alumni'
        }).execPopulate();
        res.status(200).send({
            blog: blog,
            comments: blog.comments
        });
    } catch (err) {
        res.status(400).send({err:err.message});
    }
})

//All comments by Alumni in the Alumni Blog
//Activity log
//verified
router.get('/alumni/me/Allcomments/AlumniBlog', AlumniAuth, async (req, res) => {
    try {
        const comments = await req.user.populate({path:'AlumniBlogCommentsByAlumni',
        populate:{
            path:'blog'
        }}).execPopulate();
        if(!comments){
            throw new Error('no comments found');
        }
        res.status(200).send(comments.AlumniBlogCommentsByAlumni);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})


//All comments by Alumni in the user blog
//Activity log
//verified
router.get('/alumni/me/Allcomments/UserBlog', AlumniAuth, async (req, res) => {
    try {
        const comments = await req.user.populate({path:'UserBlogCommentsByAlumni',
        populate:{
            path:'blog'
        }}).execPopulate();
        if(!comments){
            throw new Error('no comments found');
        }
        res.status(200).send(comments.UserBlogCommentsByAlumni);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})


//all comments in the user blog
//id=blog id
//verified
router.get('/blog/user/:id/allComments/alumni',AlumniAuth,async(req,res)=>{
    try{
      const blog=await UserBlog.findOne({_id:req.params.id});
      if(!blog){
          throw new Error('not found');
      }
      const comments=await UserBlogComments.find({blog:blog._id}).sort({'createdAt':'-1'}).populate('userCommentMaker alumniCommentMaker').exec();
       if(comments.length===0){
           throw new Error('no comments found');
       }
       res.status(200).send(comments);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//all comments in the Alumniblog
//here id=blog id
//verified
router.get('/blog/alumni/:id/allComments/alumni',AlumniAuth,async(req,res)=>{
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

//Alumni Sign Up
//first alumni have to send request to this route
//if admin accepts then his request to sign up will be accepted
//verified
router.post('/temporary/alumni/signup', async (req, res) => {
    try {
        const temp = new TempAlumni(req.body);
        await temp.save();
        res.status(201).send(temp);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//alumni Login
//verified
router.post('/alumni/login', async (req, res) => {
    try {
        const alumni = await Alumni.CheckCredentials(req.body.email,req.body.password);
        if (!alumni) {
            throw new Error('Credentials failed');
        }
        const token = await alumni.getToken();
        res.status(200).send({ alumni, token });
    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})


//comment in the user blog by alumni
//id=blogid
//verified
router.post('/blog/user/:id/Alumnicomment', AlumniAuth, async (req, res) => {
    try {
        const newcomment = new Comments({
            ...req.body,
            blog: req.params.id,
            alumniCommentMaker: req.user._id
        })
        await newcomment.save();
        const comment=await UserBlogComments.findOne({_id:newcomment._id}).populate('alumniCommentMaker');
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})


const upload=multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png||jpg||jpeg)$/)){
            cb(new Error('file must me an image'));
        }
        cb(undefined,true);
    }
})

//alumniBlogPost
//
router.post('/blog/alumni', AlumniAuth, upload.single('blogPic'),async (req, res) => {
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
            const blog = new AlumniBlog({
                ...req.body,
                image:pic,
                Author: req.user._id
            });
            await blog.save();
            res.status(201).send(blog);
        }
        // else{
        //    const blog = new AlumniBlog({
        //         ...req.body,
        //         Author: req.user._id
        //     });
        //     await blog.save();
        //     res.status(201).send(blog);
        // }
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//comment in the alumni blog
//id=blog id
//verified
router.post('/blog/Alumni/:id/Alumnicomment', AlumniAuth, async (req, res) => {
    try {
        let newcomment = new AlumniBlogComments({
            ...req.body,
            blog: req.params.id,
            alumniCommentMaker: req.user._id
        })
        await newcomment.save();
        const comment=await AlumniBlogComments.findOne({_id:newcomment._id}).populate('alumniCommentMaker');
        res.status(201).send(comment);
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ err: err.message });
    }
})



//React in a User Blog
//here id=UserBlogId
router.post('/blog/user/:id/AlumniReact',AlumniAuth,async(req,res)=>{
    try{
        const user=req.user;
        const blog=await UserBlog.findOne({_id:req.params.id}).select('-image');
        const userreact=await UserBlog.findOne({_id:blog._id,'React.alumni':req.user._id}).select('-image');
        if(!userreact){
            blog.React=blog.React.concat({alumni:user._id});
            await blog.save();
        }else{
            blog.React=blog.React.filter((data)=>{
                if(data.user){
                    return data;
                }
               return(data.alumni._id.toString()!==req.user._id.toString())
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
router.post('/blog/alumni/:id/AlumniReact',AlumniAuth,async(req,res)=>{
    try{
        const user=req.user;
        const blog=await AlumniBlog.findOne({_id:req.params.id}).select('-image');
        const userreact=await AlumniBlog.findOne({_id:blog._id,'React.alumni':req.user._id}).select('-image');
        if(!userreact){
            blog.React=blog.React.concat({alumni:user._id});
            await blog.save();
        }else{
            blog.React=blog.React.filter((data)=>{
                if(data.user){
                    return data;
                }
               return(data.alumni._id.toString()!==req.user._id.toString())
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



//edit info
//verified
router.patch('/Alumni', AlumniAuth, async (req, res) => {
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
        res.status(201).send({alumni:req.user});
    } catch (err) {
        res.status(400).send({ err: err.message })
    }
})


//edit comment in the user blog
//here id=comment id
//verified
router.patch('/blog/userBlog/alumni/comment/:id',AlumniAuth,async(req,res)=>{
    try{
   const comment=await UserBlogComments.findOne({_id:req.params.id,alumniCommentMaker:req.user._id});
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
router.patch('/blog/AlumniBlog/alumni/comment/:id',AlumniAuth,async(req,res)=>{
    try{
   const comment=await AlumniBlogComments.findOne({_id:req.params.id,alumniCommentMaker:req.user._id});
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


//editing Alumni Blog
//verified
router.patch('/blog/alumni/:id', AlumniAuth,upload.single('blogImage'),async (req, res) => {
    try {
        const {title,description}=req.body;
        if(req.file!==undefined){
            const pic=await sharp(req.file.buffer).png().resize({height:500,width:500}).toBuffer();
            const blog= await AlumniBlog.findOne({Author:req.user._id,_id:req.params.id});
            if(!blog){
                throw new Error('can\'t be edited');
            }
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
            const blog= await AlumniBlog.findOne({Author:req.user._id,_id:req.params.id});
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

//AlumniBlog delete
//id=blogid
//verified
router.delete('/alumni/me/AlumniBlog/:id',AlumniAuth,async(req,res)=>{
    try{
        const blog=await AlumniBlog.findOne({Author:req.user._id,_id:req.params.id});
        if(!blog){
            throw new Error('not found');
        }
        const comment=await AlumniBlogComments.deleteMany({blog:blog._id});
        const deleteBlog=await AlumniBlog.deleteOne({Author:req.user._id,_id:req.params.id});
        if(!deleteBlog){
            throw new Error('Not found');
        }
        res.status(200).send();
      }catch(err){
          res.status(400).send({err:err.message});
      }
})


//AlumniBlogCommentDelete
//id=commentId
//verified
router.delete('/alumni/me/AlumniBlogcomment/:id',AlumniAuth,async(req,res)=>{
    try{
    const test=await AlumniBlogComments.findOne({alumniCommentMaker:req.user._id,_id:req.params.id});
      const comment=await AlumniBlogComments.deleteOne({alumniCommentMaker:req.user._id,_id:req.params.id});
      if(!test){
          throw new Error('no comments found');
      }
      res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//userBlogComment Delete
//id=commentId
//verified
router.delete('/alumni/me/userBlogcomment/:id',AlumniAuth,async(req,res)=>{
    try{
        const test =await UserBlogComments.findOne({alumniCommentMaker:req.user._id,_id:req.params.id});
      const comment=await UserBlogComments.deleteOne({alumniCommentMaker:req.user._id,_id:req.params.id});
      if(!test){
          throw new Error('no comments found');
      }
      res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//delete alumni profile
//verified
router.delete('/alumni/me',AlumniAuth,async(req,res)=>{
    try{
        const blog=await UserBlog.deleteMany({Author:req.user._id});
        const userblogcomment=await UserBlogComments.deleteMany({alumniCommentMaker:req.user._id});
        const alumnblogcomment=await AlumniBlogComments.deleteMany({alumniCommentMaker:req.user._id});
        const userProfile=await AlumniProfile.deleteOne({alumni:req.user._id});
        if(!userProfile){
            throw new Error('Profile can not be deleted' );
        }
       console.log('user profile deleted')
        const user=await Alumni.deleteOne({_id:req.user._id});
        if(!user){
            throw new Error('Alumni can not be deleted' );
        }
        res.status(200).send();
    }
    catch(err){
        res.status(400).send({err:err.message});
    }
})


//delete others comment created in his post
//verified
router.delete('/user/me/:blogId/AlumniBogComment/:id',AlumniAuth,async(req,res)=>{
    try{
       const blog=await AlumniBlog.findOne({_id:req.params.blogId,Author:req.user._id});
       if(!blog){
           console.log('blog can\'t be deleted');
       }
       const test=await AlumniBlogComments.findOne({_id:req.params.id,blog:blog._id});
       if(!test){
        throw new Error('already deleted or the blog was not created by you');
    }
       const comment=await AlumniBlogComments.deleteOne({_id:req.params.id,blog:blog._id});
        res.status(200).send();
       }catch(err){
        res.status(400).send({err:err.message});
    }
})

module.exports = router;