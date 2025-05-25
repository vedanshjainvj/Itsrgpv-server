import scholarshipServices from "../services/scholarship.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class ScholarshipController {

    async getScholarships(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 20;
            
            const Scholarships = await scholarshipServices.getAllScholarships(page, limit);
            if (!Scholarships) {
                throw new APIError(statusCodeUtility.NotFound, "No Scholarships found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Scholarships found", Scholarships, response);
    
    }

    async getScholarshipById(request, response, next) {
            if (!request.params || !request.params.id) {
                throw new APIError(statusCodeUtility.BadRequest, "Scholarship ID is required");
            }
            
            const id = request.params.id;
            const Scholarship = await scholarshipServices.findScholarshipById(id);
            
            if (!Scholarship) {
               throw new APIError(statusCodeUtility.NotFound, "Scholarship not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Scholarship found", Scholarship, response);
   
    }

    async addScholarship(request, response, next) {
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { organisationName, organisationType, applyUrl, amount, 
                   eligibilityCriteria, documentRequired, contactInfo } = request.body;
            
            if (!organisationName || !organisationType || !applyUrl || !amount) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }
            
            const data = {
                organisationName,
                organisationType,
                applyUrl,
                amount,
                eligibilityCriteria,
                documentRequired,
                contactInfo
            };
            
            const newScholarship = await scholarshipServices.createScholarship(data);
            
            if (!newScholarship) {
                throw new APIError(statusCodeUtility.InternalServerError, "Scholarship not added");
            }
            
            return ResponseHandler(statusCodeUtility.Created, "Scholarship added", newScholarship, response);
      
    }

    async editScholarship(request, response, next) {
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Scholarship ID is required");
            }
            
            const validFields = ["organisationName", "organisationType", "applyUrl", 
                               "amount", "eligibilityCriteria", "documentRequired", "contactInfo"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }
            
            const updatedScholarship = await scholarshipServices.editScholarship(id, updateData);
            
            if (!updatedScholarship) {
                throw new APIError(statusCodeUtility.NotFound, "Scholarship not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Scholarship updated", updatedScholarship, response);
  
    }

    async deleteScholarship(request, response, next) {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Scholarship ID is required"));
            }
            
            const deletedScholarship = await scholarshipServices.deleteScholarship(id);
            
            if (!deletedScholarship) {
                throw new APIError(statusCodeUtility.NotFound, "Scholarship not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Scholarship deleted", deletedScholarship, response);
     
    }
}

export default new ScholarshipController();