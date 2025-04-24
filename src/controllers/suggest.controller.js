import suggestModel from "../models/suggest.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class SuggestController {

    async getSuggests(request, response, next) {
        const Suggests = await suggestModel.find({});
        if (!Suggests) {
            return new APIError(statusCodeUtility.NotFound, "No Suggests found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Suggests found", Suggests, response);
    }

    async getSuggestById(request, response, next) {
        const Suggest = await suggestModel.findById(request.params.id);
        if (!Suggest) {
            return new APIError(statusCodeUtility.NotFound, "Suggest not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Suggest found", Suggest, response);
    }


    async addSuggest(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { firstName, lastName, email, contactNumber, branch, topicOfFeedback, supportingAttchment, enrollmentNumber, descriptionOfFeedback, passoutYear, semester } = request.body;

        const newSuggest = await suggestModel.create({
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
        });
        if (!newSuggest) {
            return new APIError(statusCodeUtility.InternalServerError, "Suggest not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Suggest added", newSuggest, response);
    }

    async editSuggest(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { firstName, lastName, email, contactNumber, branch, topicOfFeedback, supportingAttchment, enrollmentNumber, descriptionOfFeedback, passoutYear, semester } = request.body;
        const updatedSuggest = await suggestModel.findByIdAndUpdate(request.params.id, {
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
        });

        if (!updatedSuggest) {
            return new APIError(statusCodeUtility.InternalServerError, "Suggest not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Suggest updated", updatedSuggest, response);
    }

    async deleteSuggest(request, response, next) {
        const Suggest = await suggestModel.findByIdAndDelete(request.params.id);
        if (!Suggest) {
            return new APIError(statusCodeUtility.NotFound, "Suggest not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Suggest deleted", Suggest, response);
    }

}

export default new SuggestController();