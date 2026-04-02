import fs from 'fs';
import cloudinary from 'cloudinary';
const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) {
            console.log("No file to upload");
            return null;
        }

        // Validate file exists
        if (!fs.existsSync(localfilepath)) {
            console.error("File not found:", localfilepath);
            return null;
        }

    
        // File has been uploaded successfully
        console.log("File uploaded to cloudinary:", response.url);
        
        // Remove the locally saved temporary file
        fs.unlinkSync(localfilepath);
        
        return response;
    } catch (error) {
        console.error("Error while uploading to cloudinary:", error.message);
        // Remove the locally saved temporary file as upload failed
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }
        return null;
    }
}

// Export the correct function name
export { uploadoncloudinary };