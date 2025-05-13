import festServices from "../services/fest.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class FestController {
    static async getFest(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Fests = await festServices.getAllFests(page, limit);
            if (!Fests) {
                return next(new APIError(statusCodeUtility.NotFound, "No Fests found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Fests found", Fests, response);
        } catch (error) {
            next(error);
        }
    }

    static async getFestById(request, response, next) {
        try {
            if (!request.params) {
                return next(new APIError(statusCodeUtility.BadRequest, "No parameters provided"));
            }
            const { id } = request.params;
            const Fest = await festServices.findFestById(id);
            if (!Fest) {
                return next(new APIError(statusCodeUtility.NotFound, "Fest not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Fest found", Fest, response);
        } catch (error) {
            next(error);
        }
    }

    static async addFest(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
    
            const { festName, organisedBy, sponsor, description, dateOfEvent, 
                  bannerPicture, festImages, theme, chiefGuest, festVideo, listOfActivities } = request.body;
    
            if (!festName || !organisedBy || !description || !dateOfEvent) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
    
            // Correcting the way to access the uploaded files
            const bannerUrl = request.files["bannerPicture"]
                ? request.files["bannerPicture"][0].path
                : null;
    
            const festImageUrl = request.files["festImages"]
                ? request.files["festImages"].map((file) => file.path) // Corrected this line
                : [];
    
            const data = {
                festName,
                organisedBy,
                sponsor,
                description,
                dateOfEvent,
                bannerPicture: bannerUrl,
                festImages: festImageUrl,
                theme,
                chiefGuest,
                festVideo,
                listOfActivities
            };
    
            const newFest = await festServices.createFest(data);
            if (!newFest) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Fest not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Fest added", newFest, response);
        } catch (error) {
            next(error);
        }
    }

    static async editFest(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Fest ID is required"));
            }
            
            const validFields = ["festName", "organisedBy", "sponser", "description", "dateOfEvent",
                               "bannerPicture", "festImages", "theme", "chiefGuest", "festVideo", 
                               "listOfActivities"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedFest = await festServices.editFest(id, updateData);
            
            if (!updatedFest) {
                return next(new APIError(statusCodeUtility.NotFound, "Fest not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Fest updated", updatedFest, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteFest(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Fest ID is required"));
            }
            const deletedFest = await festServices.deleteFest(id);
            if (!deletedFest) {
                return next(new APIError(statusCodeUtility.NotFound, "Fest not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Fest deleted", deletedFest, response);
        } catch (error) {
            next(error);
        }
    }
}

export default FestController;