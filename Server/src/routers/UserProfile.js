const mongoose = require('mongoose');
const UserProfile = require('../models/UserProfile');
const express = require('express');
const axios = require('axios');
const multer=require('multer');
const sharp=require('sharp');
const router = express.Router();
const auth = require('../middleware/auth');
require('dotenv').config();
const ContestRanking=require('../models/ContestRankings');

//get reputation of another user
router.get('/user/another/:id/reputation',auth,async(req,res)=>{
    try{
        const profile=await UserProfile.findOne({user:req.params.id});
        const first=await ContestRanking.countDocuments({first:profile._id});
        const second=await ContestRanking.countDocuments({second:profile._id});
        const third=await ContestRanking.countDocuments({third:profile._id});
        const total=(first*30)+(second*20)+(third*10);
        res.status(200).json(total);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//Get the Reputation point of an user
//30 points for first
//20 for second
//10 for third
router.get('/user/me/reputation',auth,async(req,res)=>{
    try{
        const profile=await UserProfile.findOne({user:req.user._id});
        const first=await ContestRanking.countDocuments({first:profile._id});
        const second=await ContestRanking.countDocuments({second:profile._id});
        const third=await ContestRanking.countDocuments({third:profile._id});
        const total=(first*30)+(second*20)+(third*10);
        res.status(200).json(total);
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


//showing own profilePic
//verified
router.get('/profile/me/profilePic',auth,async(req,res)=>{
    try{
        const userprofile=await UserProfile.findOne({user:req.user._id});
        if(!userprofile){
            throw new Error('create a profile first');
        }
        const pic=userprofile.profilePic;
        if(!pic){
            throw new Error('Upload a picture first');
        }
        res.status(200).send({pic});
    }catch(err){
     res.status(400).send({err:err.message});
    }
})

//showing own Profile
//verified
router.get('/profile/me', auth, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user._id }).select('-profilePic');
        if(!profile){
            throw new Error('create a profile first');
        }
        await profile.populate('user').execPopulate();
        res.status(200).send(profile)
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//showing github repos
//verified
router.get('/profile/me/githubRepos', auth, async (req, res) => {
    try {
        const user = await UserProfile.findOne({ user: req.user._id });
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

//showing codeforce rating
router.get('/profile/me/codeforceRatings',auth,async(req,res)=>{
    try{  
        const user=await UserProfile.findOne({user:req.user._id});
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

//codeforce user info
//verified
router.get('/profile/me/codeforceUserInfo',auth,async(req,res)=>{
    try{  
        const user=await UserProfile.findOne({user:req.user._id});
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




//posting info
//verified
router.post('/profile/me', auth, async (req, res) => {
    try {
        const userprofile=await UserProfile.findOne({user:req.user._id});
        const {
            company, skills, location, bio, status, website, githubusername,codeforceusername,
             youtube, facebook, instagram, twitter, linkedin,dateOfBirth,nationality
        } = req.body;
        if(!userprofile){
            const profile = {};
            profile.user = req.user._id;
            if(dateOfBirth){
                profile.dateOfBirth=dateOfBirth
            }
            if(nationality){
                profile.nationality=nationality;
            }
            if (company) {
                profile.company = company;
            }
            if (website) {
                profile.website = website;
            }
            if (location) {
                profile.location = location;
            }
            if (status) {
                profile.status = status;
            }
            if (location) {
                profile.location = location;
            }
            if (bio) {
                profile.bio = bio;
            }
            if (githubusername) {
                profile.githubusername = githubusername;
            }
            if(codeforceusername){
                profile.codeforceusername=codeforceusername;
            }
            if (skills) {
                profile.skills = skills.split(',').map((skill) => {
                    return skill.trim();
                });
            }
            profile.social = {};
            if (youtube) {
                profile.social.youtube = youtube;
            }
            if (facebook) {
                profile.social.facebook = facebook;
            }
            if (twitter) {
                profile.social.twitter = twitter;
            }
            if (linkedin) {
                profile.social.linkedin = linkedin;
            }
            if (instagram) {
                profile.social.instagram = instagram;
            }
            const userprofile = new UserProfile(profile);
            await userprofile.save();
            await userprofile.populate('user').execPopulate();
            res.status(201).send({ userprofile });
        }
        else if(userprofile){
            if(dateOfBirth){
                userprofile.dateOfBirth=dateOfBirth
            }
            if(nationality){
                userprofile.nationality=nationality;
            }
            if (company) {
                userprofile.company = company;
            }
            if (website) {
                userprofile.website = website;
            }
            if (location) {
                userprofile.location = location;
            }
            if (status) {
                userprofile.status = status;
            }
            if (location) {
                userprofile.location = location;
            }
            if (bio) {
                userprofile.bio = bio;
            }
            if (githubusername) {
                userprofile.githubusername = githubusername;
            }
            if(codeforceusername){
                userprofile.codeforceusername=codeforceusername
            }
            if (skills) {
                userprofile.skills = skills.split(",").map((skill) => {
                    return skill.trim();
                });
            }
            if (youtube) {
                userprofile.social.youtube = youtube;
            }
            if (facebook) {
                userprofile.social.facebook = facebook;
            }
            if (twitter) {
                userprofile.social.twitter = twitter;
            }
            if (linkedin) {
                userprofile.social.linkedin = linkedin;
            }
            if (instagram) {
                userprofile.social.instagram = instagram;
            }
            await userprofile.save();
            await userprofile.populate('user').execPopulate();
            res.status(201).send({ userprofile });
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ err: err.message });
    }
})


//experience share
//verified
router.post('/profile/me/experience', auth, async (req, res) => {
    try {
        const { title, company, location, from, to, description } = req.body;
        if (!title || !company || !location) {
            throw new Error('Must be present title,company.location');
        }
        const profile = await UserProfile.findOne({ user: req.user._id });
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
        res.status(201).send({profile});

    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//education share
//verified
router.post('/profile/me/education', auth, async (req, res) => {
    try {
     
        const { school, college, university, fieldOfStudy, BscPassingYear, description } = req.body;
        const profile = await UserProfile.findOne({ user: req.user._id });
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
        res.status(201).send({profile});

    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

const upload=multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg||jpeg|png)$/)){
           return cb(new Error('file must be an image'));
        }
        cb(undefined,true);
    }
})

//post profilePic
//verified
router.post('/profile/me/profilePic',auth,upload.single('profilePic'),async(req,res)=>{
   try{
      const buffer=await sharp(req.file.buffer).png().resize({width:300,height:300}).toBuffer();
    let profile=await UserProfile.findOne({user:req.user._id});
    if(!profile){
        profile=new UserProfile({user:req.user._id});
        profile.profilePic=buffer;
        const pic=buffer;
        await profile.save();
        res.status(201).send({pic});
    }else{
        profile.profilePic=buffer;
        const pic=buffer;
        await profile.save();
        res.status(201).send({pic});
    }
   }
   catch(err){
       res.status(400).send({err:err.message});
   }
},(error,req,res,next)=>{
res.status(400).send({err:error.message});
})

//edit info
//verified
router.patch('/profile/me', auth, async (req, res) => {
    try {
        const userprofile = await UserProfile.findOne({ user: req.user._id });
        const {
            company, skills, location, bio, status, website, githubusername,codeforceusername,
             youtube, facebook, instagram, twitter, linkedin,dateOfBirth,nationality
        } = req.body;
        if(dateOfBirth){
            userprofile.dateOfBirth=dateOfBirth
        }
        if(nationality){
            userprofile.nationality=nationality;
        }
        if (company) {
            userprofile.company = company;
        }
        if (website) {
            userprofile.website = website;
        }
        if (location) {
            userprofile.location = location;
        }
        if (status) {
            userprofile.status = status;
        }
        if (location) {
            userprofile.location = location;
        }
        if (bio) {
            userprofile.bio = bio;
        }
        if (githubusername) {
            userprofile.githubusername = githubusername;
        }
        if(codeforceusername){
            userprofile.codeforceusername=codeforceusername
        }
        if (skills) {
            userprofile.skills = skills.split(',').map((skill) => {
                return skill.trim();
            });
        }
        if (youtube) {
            userprofile.social.youtube = youtube;
        }
        if (facebook) {
            userprofile.social.facebook = facebook;
        }
        if (twitter) {
            userprofile.social.twitter = twitter;
        }
        if (linkedin) {
            userprofile.social.linkedin = linkedin;
        }
        if (instagram) {
            userprofile.social.instagram = instagram;
        }
        await userprofile.save();
        await userprofile.populate('user').execPopulate();
        res.status(201).send({ profile:userprofile });
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//edit experience
//verified
router.patch('/profile/me/experience/:id', auth, async (req, res) => {
    try {
        const { title, company, location, from, to, description } = req.body;
        const profile = await UserProfile.findOne({ user: req.user._id });
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
        res.status(201).send({profile});
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//edit education
//verified
router.patch('/profile/me/education/:id', auth, async (req, res) => {
    try {
        const { school, college, university, fieldOfStudy, BscPassingYear, description } = req.body;
        const profile = await UserProfile.findOne({ user: req.user._id });
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
        res.status(201).send({profile});
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})
//delete experience
//verified
router.delete('/profile/me/experience/:id', auth, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user._id });
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
//verified
router.delete('/profile/me/education/:id', auth, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user._id });
        profile.education = profile.education.filter((edu) => {
            return edu.id != req.params.id;
        })
        await profile.save();
        res.status(200).send();
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
})

//delete profile pic
//verified
router.delete('/profile/me/profilePic',auth,async(req,res)=>{
    try{
     const userprofile=await UserProfile.findOne({user:req.user.id});
     userprofile.profilePic=undefined;
     await userprofile.save();
     res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})
module.exports = router;