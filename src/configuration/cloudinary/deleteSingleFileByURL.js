import APIError from "../../utils/APIError.js";
import statusCodeUtility from "../../utils/statusCodeUtility.js";
import cloudinary from "./cloudinary.config.js";

const deleteSingleFile = async(url)=>{
        try {
                const publicId = url.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
            throw APIError(statusCodeUtility.Conflict,"profile have been update but image have not delete");
        }
}

export default deleteSingleFile;