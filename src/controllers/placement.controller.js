import placementServices from "../services/placement.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PlacementController {

    static async getPlacements(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Placements = await placementServices.getAllPlacements(page, limit);
            if (!Placements) {
                return next(new APIError(statusCodeUtility.NotFound, "No Placements found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Placements found", Placements, response);
        } catch (error) {
            next(error);
        }
    }

    static async getPlacementById(request, response, next) {
        try {
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Placement ID is required"));
            }
            const id = request.params.id;
            const Placement = await placementServices.findPlacementById(id);
            if (!Placement) {
                return next(new APIError(statusCodeUtility.NotFound, "Placement not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Placement found", Placement, response);
        } catch (error) {
            next(error);
        }
    }

    static async addPlacement(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { studentFirstName, studentLastName, email, contactNumber, 
                    profilePicture, skills, enrollmentNumber, company, passoutYear, semester } = request.body;
            
            if (!studentFirstName || !studentLastName || !email || !contactNumber || 
                !enrollmentNumber || !passoutYear || !semester) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
            
            const data = {
                studentFirstName,
                studentLastName,
                email,
                contactNumber,
                profilePicture,
                skills,
                enrollmentNumber,
                company,
                passoutYear,
                semester
            };
            
            const newPlacement = await placementServices.createPlacement(data);
            if (!newPlacement) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Placement not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Placement added", newPlacement, response);
        } catch (error) {
            next(error);
        }
    }

    static async editPlacement(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Placement ID is required"));
            }
            
            const validFields = ["studentFirstName", "studentLastName", "email", "contactNumber", 
                               "profilePicture", "skills", "enrollmentNumber", "company", 
                               "passoutYear", "semester"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedPlacement = await placementServices.editPlacement(id, updateData);
            
            if (!updatedPlacement) {
                return next(new APIError(statusCodeUtility.NotFound, "Placement not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Placement updated", updatedPlacement, response);
        } catch (error) {
            next(error);
        }
    }

    static async deletePlacement(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Placement ID is required"));
            }
            const deletedPlacement = await placementServices.deletePlacement(id);
            if (!deletedPlacement) {
                return next(new APIError(statusCodeUtility.NotFound, "Placement not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Placement deleted", deletedPlacement, response);
        } catch (error) {
            next(error);
        }
    }
}

export default PlacementController;