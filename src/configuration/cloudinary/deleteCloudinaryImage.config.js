import APIError from "../utils/APIError.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import cloudinary from "./cloudinary.config.js";

export const deleteImageByUrl = async (imageUrl) => {
    try {
      const urlParts = imageUrl.split('/');
      const fileNameWithExtension = urlParts.pop(); 
      let fileName = fileNameWithExtension.split('.'); 
      fileName= fileName[0]+'.'+fileName[1];
      const publicId = urlParts.slice(7).join('/') + '/' + fileName; 
      const result = await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Error deleting image:", error);
        throw new APIError(statusCodeUtility.NotFound,"they have error to delete image..")
    }
  };