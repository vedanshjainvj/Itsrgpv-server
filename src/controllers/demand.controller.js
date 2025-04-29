import demandServices from "../services/demand.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class DemandController {

    static async getDemands(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Demands = await demandServices.getAllDemands(page, limit);
            if (!Demands) {
                return next(new APIError(statusCodeUtility.NotFound, "No Demands found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Demands found", Demands, response);
        } catch (error) {
            next(error);
        }
    }

    static async getDemandById(request, response, next) {
        try {
            if (!request.params) {
                return next(new APIError(statusCodeUtility.NotFound, "No Demands found"));
            }
            const id = request.params.id;
            const Demand = await demandServices.findDemandById(id);
            if (!Demand) {
                return next(new APIError(statusCodeUtility.NotFound, "Demand not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Demand found", Demand, response);
        } catch (error) {
            next(error);
        }
    }

    static async addDemand(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            const { firstName, lastName, email, year, topicOfFeedback, 
                    supportAttachment, rating, demandTitle, description,progessCount } = request.body;
            
            if (!firstName || !lastName || !email || !year || !topicOfFeedback || !description) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }

            const data = {
                firstName,
                lastName,
                email,
                year,
                topicOfFeedback,
                supportAttachment,
                rating,
                demandTitle,
                description,
                progessCount
            };

            const newDemand = await demandServices.createDemand(data);
            if (!newDemand) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Demand not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Demand added", newDemand, response);
        } catch (error) {
            next(error);
        }
    }

    static async editDemand(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Demand ID is required"));
            }
            
            const validFields = ["firstName", "lastName", "email", "year", "topicOfFeedback", 
                               "supportAttachment", "rating", "demandTitle", "description"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedDemand = await demandServices.editDemand(id, updateData);
            
            if (!updatedDemand) {
                return next(new APIError(statusCodeUtility.NotFound, "Demand not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Demand updated", updatedDemand, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteDemand(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Demand ID is required"));
            }
            const deletedDemand = await demandServices.deleteDemand(id);
            if (!deletedDemand) {
                return next(new APIError(statusCodeUtility.NotFound, "Demand not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Demand deleted", deletedDemand, response);
        } catch (error) {
            next(error);
        }
    }
}

export default DemandController;