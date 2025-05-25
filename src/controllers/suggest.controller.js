import suggestServices from "../services/suggest.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class SuggestController {

    async getSuggests(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Suggests = await suggestServices.getAllSuggests(page, limit);
            if (!Suggests) {
                throw new APIError(statusCodeUtility.NotFound, "No Suggests found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Suggests found", Suggests, response);
    }

    async getSuggestById(request, response, next) {
            if (!request.params || !request.params.id) {
               throw new APIError(statusCodeUtility.BadRequest, "Suggest ID is required");
            }
            
            const id = request.params.id;
            const Suggest = await suggestServices.findSuggestById(id);
            
            if (!Suggest) {
                throw new APIError(statusCodeUtility.NotFound, "Suggest not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Suggest found", Suggest, response);
    }

    async addSuggest(request, response, next) {
  
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { firstName, lastName, email, contactNumber, branch, topicOfFeedback, 
                   supportingAttchment, enrollmentNumber, descriptionOfFeedback, 
                   passoutYear, semester } = request.body;
            
            if (!firstName || !lastName || !email || !contactNumber || 
                !branch || !enrollmentNumber || !passoutYear || !semester) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
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
               throw new APIError(statusCodeUtility.InternalServerError, "Suggest not added");
            }
            
            return ResponseHandler(statusCodeUtility.Created, "Suggest added", newSuggest, response);
    }

    async editSuggest(request, response, next) {
      
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Suggest ID is required");
            }
                    const getDataById = await suggestServices.findSuggestById(id);
            
                                            if (!getDataById) {
                                                throw new APIError(statusCodeUtility.NotFound, "Invalid placement id...")
                                            }
            const validFields = ["firstName", "lastName", "email", "contactNumber", "branch", 
                               "topicOfFeedback", "supportingAttchment", "enrollmentNumber", 
                               "descriptionOfFeedback", "passoutYear", "semester"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }
            
            const updatedSuggest = await suggestServices.editSuggest(id, updateData);
            
            if (!updatedSuggest) {
                throw new APIError(statusCodeUtility.NotFound, "Suggest not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Suggest updated", updatedSuggest, response);
    }

    async deleteSuggest(request, response, next) {
    
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Suggest ID is required"));
            }
            
            const deletedSuggest = await suggestServices.deleteSuggest(id);
            
            if (!deletedSuggest) {
                return next(new APIError(statusCodeUtility.NotFound, "Suggest not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Suggest deleted", deletedSuggest, response);
    }
}

export default new SuggestController();