import suggestServices from "../services/suggest.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class SuggestController {

    async getSuggests(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Suggests = await suggestServices.getAllSuggests(page, limit);
            if (!Suggests) {
                return next(new APIError(statusCodeUtility.NotFound, "No Suggests found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Suggests found", Suggests, response);
        } catch (error) {
            next(error);
        }
    }

    async getSuggestById(request, response, next) {
        try {
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Suggest ID is required"));
            }
            
            const id = request.params.id;
            const Suggest = await suggestServices.findSuggestById(id);
            
            if (!Suggest) {
                return next(new APIError(statusCodeUtility.NotFound, "Suggest not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Suggest found", Suggest, response);
        } catch (error) {
            next(error);
        }
    }

    async addSuggest(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { firstName, lastName, email, contactNumber, branch, topicOfFeedback, 
                   supportingAttchment, enrollmentNumber, descriptionOfFeedback, 
                   passoutYear, semester } = request.body;
            
            if (!firstName || !lastName || !email || !contactNumber || 
                !branch || !enrollmentNumber || !passoutYear || !semester) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
            
            const data = {
                firstName,
                lastName,
                email,
                contactNumber,
                branch,
                topicOfFeedback,
                supportingAttchment,
                enrollmentNumber,
                descriptionOfFeedback,
                passoutYear,
                semester
            };
            
            const newSuggest = await suggestServices.createSuggest(data);
            
            if (!newSuggest) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Suggest not added"));
            }
            
            return ResponseHandler(statusCodeUtility.Created, "Suggest added", newSuggest, response);
        } catch (error) {
            next(error);
        }
    }

    async editSuggest(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Suggest ID is required"));
            }
            
            const validFields = ["firstName", "lastName", "email", "contactNumber", "branch", 
                               "topicOfFeedback", "supportingAttchment", "enrollmentNumber", 
                               "descriptionOfFeedback", "passoutYear", "semester"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedSuggest = await suggestServices.editSuggest(id, updateData);
            
            if (!updatedSuggest) {
                return next(new APIError(statusCodeUtility.NotFound, "Suggest not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Suggest updated", updatedSuggest, response);
        } catch (error) {
            next(error);
        }
    }

    async deleteSuggest(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Suggest ID is required"));
            }
            
            const deletedSuggest = await suggestServices.deleteSuggest(id);
            
            if (!deletedSuggest) {
                return next(new APIError(statusCodeUtility.NotFound, "Suggest not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Suggest deleted", deletedSuggest, response);
        } catch (error) {
            next(error);
        }
    }
}

export default new SuggestController();