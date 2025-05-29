import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import photogalleryServices from "../services/photogallery.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PhotogalleryController {

    // Add a new photogallery entry
    static async addPhotogallery(request, response, next) {
        if (!request.body) return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
        
        let imageUrls = [];
        if (request.files && request.files.length > 0) {
            imageUrls = request.files.map(file => file.path);
        }

        if (imageUrls.length === 0) {
            return next(new APIError(statusCodeUtility.BadRequest, "No images provided"));
        }

        const data = {
            images: imageUrls
        };

        const newPhotogallery = await photogalleryServices.createPhotogallery(data);
        if (!newPhotogallery) return next(new APIError(statusCodeUtility.InternalServerError, "Photogallery entry not created"));

        return ResponseHandler(statusCodeUtility.Created, "Photogallery entry created successfully", newPhotogallery, response);
    }

    // Get all photogallery entries
    static async getPhotogalleries(request, response, next) {
        const page = parseInt(request.query.page) || 1; 
        const limit = parseInt(request.query.limit) || 9;
        
        const photogalleries = await photogalleryServices.getAllPhotogallery(page, limit);
        if (!photogalleries) return next(new APIError(statusCodeUtility.NotFound, "No photogallery entries found"));
        
        return ResponseHandler(statusCodeUtility.Success, "Photogallery entries found", photogalleries, response);
    }

    // Get a specific photogallery entry by ID
    static async getPhotogalleryById(request, response, next) {
        if (!request.params) return next(new APIError(statusCodeUtility.NotFound, "No photogallery entry found"));
        
        const id = request.params.id;
        const photogallery = await photogalleryServices.findPhotogalleryById(id);
        
        if (!photogallery) return next(new APIError(statusCodeUtility.NotFound, "Photogallery entry not found"));
        
        return ResponseHandler(statusCodeUtility.Success, "Photogallery entry found", photogallery, response);
    }

    // Add images to an existing photogallery entry
    static async addImages(request, response, next) {
        if (!request.params) return next(new APIError(statusCodeUtility.BadRequest, "No ID provided"));
        
        const id = request.params.id;
        const existingPhotogallery = await photogalleryServices.findPhotogalleryById(id);
        
        if (!existingPhotogallery) return next(new APIError(statusCodeUtility.NotFound, "Photogallery entry not found"));
        
        if (!request.files || request.files.length === 0) {
            return next(new APIError(statusCodeUtility.BadRequest, "No images provided"));
        }
        
        const imageUrls = request.files.map(file => file.path);
        const updatedPhotogallery = await photogalleryServices.addImages(id, imageUrls);
        
        if (!updatedPhotogallery) return next(new APIError(statusCodeUtility.InternalServerError, "Failed to add images"));
        
        return ResponseHandler(statusCodeUtility.Success, "Images added successfully", updatedPhotogallery, response);
    }

    // Remove images from a photogallery entry
    static async removeImages(request, response, next) {
        if (!request.params) return next(new APIError(statusCodeUtility.BadRequest, "No ID provided"));
        
        const id = request.params.id;
        const existingPhotogallery = await photogalleryServices.findPhotogalleryById(id);
        
        if (!existingPhotogallery) return next(new APIError(statusCodeUtility.NotFound, "Photogallery entry not found"));
        
        if (!request.body.imageUrls || !Array.isArray(request.body.imageUrls) || request.body.imageUrls.length === 0) {
            return next(new APIError(statusCodeUtility.BadRequest, "No image URLs provided"));
        }
        
        // Delete images from cloudinary
        const imageUrls = request.body.imageUrls;
        for (const url of imageUrls) {
            await deleteSingleFile(url);
        }
        
        // Remove URLs from database
        const updatedPhotogallery = await photogalleryServices.removeImages(id, imageUrls);
        
        if (!updatedPhotogallery) return next(new APIError(statusCodeUtility.InternalServerError, "Failed to remove images"));
        
        return ResponseHandler(statusCodeUtility.Success, "Images removed successfully", updatedPhotogallery, response);
    }

    // Delete an entire photogallery entry
    static async deletePhotogallery(request, response, next) {
        const { id } = request.params;
        if (!id) return next(new APIError(statusCodeUtility.BadRequest, "Photogallery ID is required"));
        
        const existingPhotogallery = await photogalleryServices.findPhotogalleryById(id);
        if (!existingPhotogallery) {
            return next(new APIError(statusCodeUtility.NotFound, "Invalid photogallery ID"));
        }
        
        // Delete all images from cloudinary
        if (existingPhotogallery.images && existingPhotogallery.images.length > 0) {
            for (const url of existingPhotogallery.images) {
                await deleteSingleFile(url);
            }
        }
        
        const deleteData = await photogalleryServices.deletePhotogallery(id);
        if (!deleteData) {
            return next(new APIError(statusCodeUtility.NotFound, "Photogallery entry could not be deleted"));
        }
        
        return ResponseHandler(statusCodeUtility.Success, "Photogallery entry deleted successfully", null, response);
    }
}

export default PhotogalleryController;
