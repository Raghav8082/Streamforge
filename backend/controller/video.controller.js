import { Video } from "../models/video_model";
import  ApiError from "../utils/ApiErrors";
import cloudinary from "cloudinary";
import {uploadoncloudinary} from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js"

export const uploadvid= async(req,res)=>{
try {
    
        const {title , description ,category , visibility } = req.body;
         const normalvisible = String(visibility??" ").trim().toLowerCase();
    
       
    
        const reftitle = title.trim().toLowerCase(); 
    if(!title || !category || !description || !visibility){
        return res.status(400).json({success:false, message: "All feilds are required"});
    }
    
    const existingvid= await Video.findOne({title});
    
    if(existingvid){
        return res.status(400).json({success:false, message:"The Movie alredy available "})
    } 
    
       if (!req.file) {
    return res.status(400).json({ success: false, message: "Video file is required" });
}

      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.V2.uploader.upload(
        fileUri.content,
        { resource_type: "video" ,
            folder:"raw-videos"
        }
      );

      const videourl = cloudResponse.secure_url;
    
    
    const newvid = new Video({
        title , 
        description,
        category, 
        visibility : normalvisible,
        producerId:req.userId,
        file:videourl,
        status: "pending_upload"
    })
    
    await newvid.save();

        if (process.env.WORKER_URL) {
      fetch(`${process.env.WORKER_URL}/transcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: newvid._id,
          file: videourl,
          title: title
        })
      });
    }

  
    
        return res.status(201).json({
          message: "Video uploaded successfully",
          success: true,
          videoId:newvid._id
        });
    
    
    
    
    }
 catch (error) {
    console.log("Error while uploading ")
    return res.status(501).json({success:false , message: " Intenal Server Error "});
}
}

