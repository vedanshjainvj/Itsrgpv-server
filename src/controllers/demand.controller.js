import demandModel from '../models/demand.model.js';
import APIError from '../utils/APIError.js';
import ResponseHandler from '../utils/APIResponse.js';
import statusCodeUtility from '../utils/statusCodeUtility.js';

class DemandController {

    async getDemands(request, response, next) {
        const Demands = await demandModel.find({});
        if (!Demands) {
            return new APIError(statusCodeUtility.NotFound, "No Demands found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Demands found", Demands, response);
    }

    async getDemandById(request, response, next) {
        if (!request.params) {
            return new APIError(statusCodeUtility.NotFound, "No Demands found");
        }
        const Demand = await demandModel.findById({ _id: request.params.id });
        return ResponseHandler(statusCodeUtility.Success, "Demand found", Demand, response);
    }

    async addDemand(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { firstName, lastName, email, year, topicOfFeedback, supportAttachment, rating, demandTitle, description } = request.body;
        const newDemand = await demandModel.create({
            firstName,
            lastName,
            email,
            year,
            topicOfFeedback,
            supportAttachment,
            rating,
            demandTitle,
            description
        });

        if (!newDemand) {
            return new APIError(statusCodeUtility.InternalServerError, "Demand not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Demand added", newDemand, response);
    }

    async editDemand(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { firstName, lastName, email, year, topicOfFeedback, supportAttachment, rating, demandTitle, description } = request.body;
        const { id } = request.params;
        const updatedDemand = await demandModel.findByIdAndUpdate({_id:id}, {
            firstName,
            lastName,
            email,
            year,
            topicOfFeedback,
            supportAttachment,
            rating,
            demandTitle,
            description
        }, { new: true });

        if (!updatedDemand) {
            return new APIError(statusCodeUtility.NotFound, "Demand not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Demand updated", updatedDemand, response);
    }

    async deleteDemand(request, response, next) {
        const { id } = request.params;
        const deletedDemand = await demandModel.findByIdAndDelete({_id:id});
        if (!deletedDemand) {
            return new APIError(statusCodeUtility.NotFound, "Demand not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Demand deleted", deletedDemand, response);
    }
}
export default new DemandController();