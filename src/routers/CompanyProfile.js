const express=require('express');
const router=new express.Router();
const companyAuth=require('../middleware/companyAuth');
const CompanyProfile=require('../models/CompanyProfile');
const multer=require('multer');
const sharp=require('sharp');

let upload=multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png||jpeg||jpg)$/)){
            cb(new Error('file must be image'));
        }
        cb(undefined,true);
    }
})

//watch own profile
//verified
router.get('/profile/company/me',companyAuth,async(req,res)=>{
    try{
    const companyProfile=await CompanyProfile.findOne({company:req.user._id});
    if(!companyProfile){
        throw new Error('nothing found');
    }
    res.status(200).send({companyProfile});
    }catch(err){
        res.status({err:err.message});
    }
})

//watch profile Pic
//verified
router.get('/profile/company/me/profilePic',companyAuth,async(req,res)=>{
    try{
        const profile=await CompanyProfile.findOne({company:req.user._id});
        if(!profile){
            throw new Error('create a profile first');
        }
        const pic=profile.logo;
        if(!pic){
            throw new Error('Upload a picture first');
        }
        res.status(200).send({pic});
    }catch(err){
        console.log(err.message)
     res.status(400).send({err:err.message});
    }
})

//upload pro pic
//verified
router.post('/profile/company/uploadProfilePic',companyAuth,upload.single('profilePic'),async(req,res)=>{
    try{
      const pic=await sharp(req.file.buffer).png().resize({height:300,width:300}).toBuffer();
      const companyProfile=await CompanyProfile.findOne({company:req.user._id});
      if(!companyProfile){
          const companyprofile=new CompanyProfile({company:req.user._id});
          companyprofile.logo=pic;
          await companyprofile.logo.save();
          res.status(201).send({pic});
      }
      companyProfile.logo=pic;
      await companyProfile.save();
      res.status(201).send({pic});
    }catch(err){
        console.log(err.message)
        res.status(400).send({err:err.message});
    }
})

//share info
//verified
router.post('/profile/company/me',companyAuth,async(req,res)=>{
    try{
       const findcompanyprofile=await CompanyProfile.findOne({company:req.user._id});
       const {established,mission,vision,About,facebook,instagram,youtube,twitter,website,linkedin,currentEmployeeNumber}=req.body;
       
       if(!findcompanyprofile){
        const profile={};
        profile.company=req.user._id;
        if(established){
            profile.established=established;
        }
        if(About){
            profile.About=About;
        }
        if(mission){
            profile.mission=mission;
        }
        if(vision){
            profile.vision=vision;
        }
        if(currentEmployeeNumber){
            profile.currentEmployeeNumber=currentEmployeeNumber;
        }
        if(website){
            profile.website=website;
        }
        profile.social={};
        if(twitter){
            profile.social.twitter=twitter;
        }
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
        const companyprofile=new CompanyProfile(profile);
        await companyprofile.save();
        res.status(201).send({companyProfile:companyprofile});
       }
       else if(findcompanyprofile){
        if(established){
            findcompanyprofile.established=established;
        }
        if(mission){
            findcompanyprofile.mission=mission;
        }
        if(About){
            findcompanyprofile.About=About;
        }
        if(vision){
            findcompanyprofile.vision=vision;
        }
        if(website){
            findcompanyprofile.website=website
        }
        if(facebook){
            findcompanyprofile.social.facebook=facebook;
        }
        if(instagram){
            findcompanyprofile.social.instagram=instagram;
        }
        if(youtube){
            findcompanyprofile.social.youtube=youtube;
        }
        if(linkedin){
            findcompanyprofile.social.linkedin=linkedin;
        }
        if(twitter){
            findcompanyprofile.social.twitter=twitter;
        }
        await findcompanyprofile.save();
        res.status(201).send({companyProfile:findcompanyprofile});
       }
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

//delete profile pic
//verified
router.delete('/profile/company/profilePic',companyAuth,async(req,res)=>{
    try{
       const profile=await CompanyProfile.findOne({company:req.user._id});
       profile.logo=undefined;
       await profile.save();
       res.status(200).send();
    }catch(err){
        res.status(400).send({err:err.message});
    }
})


module.exports=router;