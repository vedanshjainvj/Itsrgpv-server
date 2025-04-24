import placementModel from "../models/placement.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PlacementController{

    async getPlacements(request, response, next){
        const Placements = await placementModel.find({});
        if(!Placements){
            return new APIError(statusCodeUtility.NotFound, "No Placements found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Placements found", Placements, response);
    }

    async getPlacementById(request, response, next){
        const Placement = await placementModel.findById(request.params.id);
        if(!Placement){
            return new APIError(statusCodeUtility.NotFound, "Placement not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Placement found", Placement, response);
    }

    async addPlacement(request, response, next){
        if(!request.body){
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
       const {studentFirstName, studentLastName, email, contactNumber, profilePicture, skills, enrollmentNumber, company, passoutYear, semester} = request.body;
       
       const newPlacement = await placementModel.create({
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
       });

         if(!newPlacement){
             return new APIError(statusCodeUtility.InternalServerError, "Placement not added");
         }
            return ResponseHandler(statusCodeUtility.Created, "Placement added", newPlacement, response);
    }

    async editPlacement(request, response, next){
        if(!request.body){
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const {studentFirstName, studentLastName, email, contactNumber, profilePicture, skills, enrollmentNumber, company, passoutYear, semester} = request.body;
        const updatedPlacement = await placementModel.findByIdAndUpdate(request.params.id, {
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
        }, {new: true});
        if(!updatedPlacement){
            return new APIError(statusCodeUtility.InternalServerError, "Placement not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Placement updated", updatedPlacement, response);
    }

    async deletePlacement(request, response, next){
        const deletedPlacement = await placementModel.findByIdAndDelete(request.params.id);
        if(!deletedPlacement){
            return new APIError(statusCodeUtility.NotFound, "Placement not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Placement deleted", deletedPlacement, response);
    }

}
export default new PlacementController();