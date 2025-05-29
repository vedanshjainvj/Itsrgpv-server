import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import demandServices from "../services/demand.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class DemandController {

    static async getDemands(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Demands = await demandServices.getAllDemands(page, limit);
            if (!Demands) {
                return next(new APIError(statusCodeUtility.NotFound, "No Demands found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Demands found", Demands, response);
    }

    static async getDemandById(request, response, next) {
            if (!request.params) {
                return next(new APIError(statusCodeUtility.NotFound, "No Demands found"));
            }
            const id = request.params.id;
            const Demand = await demandServices.findDemandById(id);
            if (!Demand) {
                return next(new APIError(statusCodeUtility.NotFound, "Demand not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Demand found", Demand, response);
    }

    static async addDemand(request, response, next) {
        try {
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
    
            const {
                firstName,
                lastName,
                email,
                year,
                topicOfFeedback,
                rating,
                demandTitle,
                description,
                progressCount,
                hashtags,
                demandStatus,
                demandSubmitted,
                submittedTo,
                administrationResponse,
                demandUpdates
            } = request.body;
    
            // Basic validation for required fields
            if (!firstName || !lastName || !email || !year || !topicOfFeedback || !description) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }
    
            // Attachments handling
            const supportAttachmentUrl = request.files?.supportAttachment
                ? request.files.supportAttachment.map((file) => file.path)
                : [];
    
            const data = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                year: parseInt(year),
                topicOfFeedback,
                supportAttachment: supportAttachmentUrl,
                rating,
                demandTitle,
                description,
                progressCount: parseInt(progressCount) || 1, // Default to 1
                hashtags,
                demandStatus, // Should be one of: "approved", "denied", "pending", "unclear"
                demandSubmitted,
                submittedTo,
                administrationResponse,
                demandUpdates
            };
    
            const newDemand = await demandServices.createDemand(data);
            if (!newDemand) {
                throw new APIError(statusCodeUtility.InternalServerError, "Demand not added");
            }
    
            return ResponseHandler(statusCodeUtility.Created, "Demand added", newDemand, response);
        } catch (error) {
            next(error);
        }
    }

    static async editDemand(request, response, next) {
     
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Demand ID is required");
            }
                   const getDataById = await demandServices.findDemandById(id);
            if(!getDataById){
              throw new APIError(statusCodeUtility.NotFound,"Invalid demands id...")
             }
            const validFields = ["firstName", "lastName", "email", "year", "topicOfFeedback", 
                               "supportAttachment", "rating", "demandTitle", "description"];
                               
                       const updateData = {};

            for (const key of validFields) {
                if (key in request.body) {
                    const newValue = request.body[key];
                    const oldValue = getDataById[key];

                    if (newValue !== undefined && newValue != oldValue) {
                        updateData[key] = newValue;
                    }
                }
            }

                   if(request.files){
             const existingImages = getDataById.supportAttachment || []; 
             const newImagePaths = request.files["supportAttachment"].map((file) => file.path)
             updateData.supportAttachment = [...existingImages, ...newImagePaths]; 
         }
            
            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }
            
            const updatedDemand = await demandServices.editDemand(id, updateData);
            
            if (!updatedDemand) {
                throw new APIError(statusCodeUtility.NotFound, "Demand not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Demand updated", updatedDemand, response);
     
    }

    static async deleteDemand(request, response, next) {
        
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Demand ID is required");
            }
                             const getDataById = await demandServices.findDemandById(id);
            if(!getDataById){
              throw new APIError(statusCodeUtility.NotFound,"Invalid demands id...")
            }
            const deletedDemand = await demandServices.deleteDemand(id);
            if (!deletedDemand) {
                throw new APIError(statusCodeUtility.NotFound, "Demand not found");
            }
            
               if (getDataById.supportAttachment && getDataById.supportAttachment.length > 0) {
    for (const url of getDataById.supportAttachment) {
        await deleteSingleFile(url);
    }
}

            return ResponseHandler(statusCodeUtility.Success, "Demand deleted", deletedDemand, response);
    }
}

export default DemandController;