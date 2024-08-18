import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs'
dotenv.config();

//configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

//saving image in the cloud
const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        //uploading the file on cloudinary
        const uploadResult = await cloudinary.uploader
        .upload(localFilePath,{ resource_type: "auto"})
        
    
        return uploadResult

    }catch(error){
        fs.unlinkSync(localFilePath)  //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export default uploadOnCloudinary;


