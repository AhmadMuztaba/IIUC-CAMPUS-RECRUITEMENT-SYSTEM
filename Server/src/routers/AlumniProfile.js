const express=require('express');
const axios =require('axios');
const router=new express.Router();
const multer=require('multer');
const sharp=require('sharp');
const AlumniProfile=require('../models/AlumniProfile');
const AlumniAuth=require('../middleware/AlumniAuth');
require('dotenv').config();

const upload=multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png||jpg||jpeg)$/)){
            cb(new Error('file must be an image'));
        }
        cb(undefined,true);
    }
})


//watch own profile
//verified
router.get('/profile/alumni/me',AlumniAuth,async(req,res)=>{
    try{
     const profile=await AlumniProfile.findOne({alumni:req.user._id});
     if(!profile){
         throw new Error('create a profile first');
     }
     res.status(200).send({alumniProfile:profile});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//see profile pic
//
router.get('/profile/alumni/profile/me/profilePic',AlumniAuth,async(req,res)=>{
    try{
        const profile=await AlumniProfile.findOne({alumni:req.user._id});
        if(!profile){
            throw new Error('create a profile first');
        }
        const pic=profile.profilePic;
        if(!pic){
            throw new Error('Upload a picture first');
        }
        res.status(200).send({pic});
    }catch(err){
     res.status(400).send({err:err.message});
    }
})

//showing github repos of alumni
router.get('/profile/alumni/github',AlumniAuth,async(req,res)=>{
    try {
        const user = await AlumniProfile.findOne({ alumni: req.user._id });
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

//showing codeforce rating of alumni
router.get('/profile/alumni/cfRatings',AlumniAuth,async(req,res)=>{
    try{
        const user=await AlumniProfile.findOne({alumni:req.user._id});
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

//upload pro pic
//verified
router.post('/profile/alumni/profile/me',upload.single('profilePic'),AlumniAuth,async(req,res)=>{
    try{
     const alumni=await AlumniProfile.findOne({alumni:req.user._id});
     const pic=await sharp(req.file.buffer).png().resize({height:300,width:300}).toBuffer();
     if(!alumni){
         const alumniProfile=new AlumniProfile({alumni:req.user._id});
         alumniProfile.profilePic=pic;
         await alumniProfile.save();
         res.status(201).send(pic);
     }
     alumni.profilePic=pic;
     await alumni.save();
     res.status(201).send({pic});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//profile create
//
router.post('/profile/alumni/me',AlumniAuth,async(req,res)=>{
    try{
       const alumni=await AlumniProfile.findOne({alumni:req.user._id});
       const {passingYear,status,currentJob, githubusername,codeforceusername,about,facebook,youtube,linkedin,instagram,twitter,website}=req.body;
       if(!alumni){
          const profile={};
          profile.alumni=req.user._id;
          if(status){
              profile.status=status;
          }
          if(passingYear){
              profile.passingYear=passingYear;
          }
          if(currentJob){
              profile.currentJob=currentJob;
          }
          if(about){
              profile.about=about;
          }
          if(website){
            profile.website=website
        }
          if (githubusername) {
            profile.githubusername = githubusername;
        }
        if(codeforceusername){
            profile.codeforceusername=codeforceusername;
        }
          profile.social={};
          if(facebook){
            profile.social.facebook=facebook;
          }
          if(instagram){
              profile.social.instagram=instagram;
          }
          if(youtube){
              profile.social.youtube=youtube;
          }
          if(linkedin){
              profile.social.linkedin=linkedin;
          }
          if(twitter){
              profile.social.twitter=twitter;
          }
         
      const alumniProfile=new AlumniProfile(profile);
      await alumniProfile.save();
      res.status(200).send({alumniProfile});
     }else if(alumni){
        if(status){
          alumni.status=status;
        }
        if(passingYear){
            alumni.passingYear=passingYear;
        }
        if(currentJob){
            alumni.currentJob=currentJob;
        }
        if(about){
            alumni.about=about;
        }
        if(website){
            alumni.website=website;
        }
        if (githubusername) {
            alumni.githubusername = githubusername;
        }
        if(codeforceusername){
            alumni.codeforceusername=codeforceusername;
        }
        if(facebook){
          alumni.social.facebook=facebook;
        }
        if(instagram){
            alumni.social.instagram=instagram;
        }
        if(youtube){
            alumni.social.youtube=youtube;
        }
        if(linkedin){
            alumni.social.linkedin=linkedin;
        }
        if(twitter){
            alumni.social.twitter=twitter;
        }
       
    await alumni.save();
    res.status(200).send({alumniProfile:alumni});
     }
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//experience share
//
router.post('/profile/alumni/experience', AlumniAuth, async (req, res) => {
    try {
        const { title, company, location, from, to, description } = req.body;
        if (!title || !company || !location) {
            throw new Error('Must be present title,company,location');
        }
        const profile = await AlumniProfile.findOne({ alumni: req.user._id });
        const experience = {};
        experience.title = title;
        experience.company = company;
        experience.location = location;
        if (from) {
            experience.from = from;
        }
        if (to) {
            experience.to = to;
        }
        if (description) {
            experience.description = description;
        }
        profile.experience.unshift(experience);
        await profile.save();
        res.status(201).send({alumniProfile:profile});

    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//education share
//verified
router.post('/profile/alumni/education', AlumniAuth, async (req, res) => {
    try {
     
        const { school, college, university, fieldOfStudy, BscPassingYear, description } = req.body;
        const profile = await AlumniProfile.findOne({ alumni: req.user._id });
        const education = {};
        if (school) {
            education.school = school;
        }
        if (college) {
            education.college = college;
        }
        if (university) {
            education.university = university;
        }
        if (fieldOfStudy) {
            education.fieldOfStudy = fieldOfStudy;
        }
        if (BscPassingYear) {
            education.BscPassingYear = BscPassingYear;
        }
        if (description) {
            education.description = description;
        }
        profile.education.unshift(education);
        await profile.save();
        res.status(201).send({alumniProfile:profile});

    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//edit experience
//
router.patch('/profile/alumni/experience/:id', AlumniAuth, async (req, res) => {
    try {
        const { title, company, location, from, to, description } = req.body;
        const profile = await AlumniProfile.findOne({ alumni: req.user._id });
        profile.experience.forEach((experience) => {
            if (req.params.id === experience.id) {
                if (title) {
                    experience.title = title;
                }
                if (company) {
                    experience.company = company;
                }
                if (location) {
                    experience.location = location;
                }
                if (from) {
                    experience.from = from;
                }
                if (to) {
                    experience.to = to;
                }
                if (description) {
                    experience.description = description;
                }
            }
        })
        await profile.save();
        res.status(201).send({alumniProfile:profile});
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//edit education
//
router.patch('/profile/alumni/education/:id', AlumniAuth, async (req, res) => {
    try {
        const { school, college, university, fieldOfStudy, BscPassingYear, description } = req.body;
        const profile = await AlumniProfile.findOne({ alumni: req.user._id });
        profile.education.forEach((education) => {
            if (req.params.id === education.id) {
                if (school) {
                    education.school = school;
                }
                if (college) {
                    education.college = college;
                }
                if (university) {
                    education.university = university;
                }
                if (fieldOfStudy) {
                    education.fieldOfStudy = fieldOfStudy;
                }
                if (BscPassingYear) {
                    education.BscPassingYear = BscPassingYear;
                }
                if (description) {
                    education.description = description;
                }
            }
        })
        await profile.save();
        res.status(201).send({alumniProfile:profile});
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})
//delete experience
//
router.delete('/profile/alumni/experience/:id', AlumniAuth, async (req, res) => {
    try {
        const profile = await AlumniProfile.findOne({ alumni: req.user._id });
        profile.experience = profile.experience.filter((exp) => {
            return exp.id != req.params.id;
        })
        await profile.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//education delete
//
router.delete('/profile/alumni/education/:id', AlumniAuth, async (req, res) => {
    try {
        const profile = await AlumniProfile.findOne({ alumni: req.user._id });
        profile.education = profile.education.filter((edu) => {
            return edu.id != req.params.id;
        })
        await profile.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//profile pic delete
//verified
router.delete('/profile/alumni/profile/profilePic',AlumniAuth,async(req,res)=>{
    try{
      const alumni=await AlumniProfile.findOne({alumni:req.user._id});
      if(!alumni){
          throw new Error('create profile first');
      }
      alumni.profilePic=undefined;
      await alumni.save();
      res.status(200).send();
    }catch(err){
res.status(400).send({err:err.message});
    }
})


module.exports=router;