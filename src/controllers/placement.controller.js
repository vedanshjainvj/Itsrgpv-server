import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import placementServices from "../services/placement.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PlacementController {

    static async getPlacements(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Placements = await placementServices.getAllPlacements(page, limit);
            if (!Placements) {
                throw new APIError(statusCodeUtility.NotFound, "No Placements found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Placements found", Placements, response);
    }

    static async getPlacementById(request, response, next) {
    
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Placement ID is required"));
            }
            const id = request.params.id;
            const Placement = await placementServices.findPlacementById(id);
            if (!Placement) {
                return next(new APIError(statusCodeUtility.NotFound, "Placement not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Placement found", Placement, response);
    }

    static async addPlacement(request, response, next) {
  
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { studentFirstName, studentLastName, email, contactNumber, salaryPackage, 
                    skills, enrollmentNumber, company, passoutYear, semester } = request.body;
            
            if (!studentFirstName || !studentLastName || !email || !contactNumber || 
                !enrollmentNumber || !passoutYear || !semester || !salaryPackage) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }

            let profileUrl = null;
            if(request.file){
                profileUrl = request.file.path;
            }
        
            const data = {
                studentFirstName,
                studentLastName,
                email,
                contactNumber,
                profilePicture : profileUrl,
                semester : parseInt(semester),
                skills,
                enrollmentNumber,
                company,
                passoutYear,
                salaryPackage
            };
            
            const newPlacement = await placementServices.createPlacement(data);
            if (!newPlacement) {
                throw new APIError(statusCodeUtility.InternalServerError, "Placement not added");
            }
            return ResponseHandler(statusCodeUtility.Created, "Placement added", newPlacement, response);
    }

    static async editPlacement(request, response, next) {

            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Placement ID is required");
            }
                const getDataById = await placementServices.findPlacementById(id);
                    if (!getDataById) {
                        throw new APIError(statusCodeUtility.NotFound, "Invalid placement id...")
                    }
            const validFields = ["studentFirstName", "studentLastName", "email", "contactNumber", 
                               "profilePicture", "skills", "enrollmentNumber", "company", 
                               "passoutYear", "semester"];
                               
    
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
        
           if (request.file) {
            updateData.profilePicture = request.file.path;
        }

            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }
            
            const updatedPlacement = await placementServices.editPlacement(id, updateData);
            
            if (!updatedPlacement) {
                throw new APIError(statusCodeUtility.NotFound, "Placement not found");
            }
            
                 if(request.file && getDataById.profilePicture){
                await deleteSingleFile(getDataById.profilePicture);
                }

            return ResponseHandler(statusCodeUtility.Success, "Placement updated", updatedPlacement, response);
  
    }

    static async deletePlacement(request, response, next) {
       
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Placement ID is required");
            }
                          const getDataById = await placementServices.findPlacementById(id);
                    if (!getDataById) {
                        throw new APIError(statusCodeUtility.NotFound, "Invalid placement id...")
                    }
            const deletedPlacement = await placementServices.deletePlacement(id);
            if (!deletedPlacement) {
                throw new APIError(statusCodeUtility.NotFound, "Placement not found");
            }
                   if(getDataById.profilePicture){
                await deleteSingleFile(getDataById.profilePicture);
                }
            return ResponseHandler(statusCodeUtility.Success, "Placement deleted", deletedPlacement, response);
   
    }
}

export default PlacementController;