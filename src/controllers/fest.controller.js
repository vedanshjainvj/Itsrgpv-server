import festModel from "../models/fest.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
class FestController {
    async getFest(request, response, next) {
        const Fests = await festModel.find({});
        if (!Fests) {
            return new APIError(statusCodeUtility.NotFound, "No Fests found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Fests found", Fests, response);
    }

    async getFestById(request, response, next) {
        const { id } = request.params;
        const Fest = await festModel.findById(id);
        if (!Fest) {
            return new APIError(statusCodeUtility.NotFound, "Fest not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Fest found", Fest, response);
    }

    async addFest(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { festName, organisedBy, sponser, description, dateOfEvent, bannerPicture, festImages, theme, chiefGuest, festVideo, listOfActivities } = request.body;
        const newFest = await festModel.create({
            festName,
            organisedBy,
            sponser,
            description,
            dateOfEvent,
            bannerPicture,
            festImages,
            theme,
            chiefGuest,
            festVideo,
            listOfActivities
        });
        if (!newFest) {
            return new APIError(statusCodeUtility.InternalServerError, "Fest not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Fest added", newFest, response);
    }

    async editFest(request, response, next) {
        const { id } = request.params;
        const { festName, organisedBy, sponser, description, dateOfEvent, bannerPicture, festImages, theme, chiefGuest, festVideo, listOfActivities } = request.body;
        const updatedFest = await festModel.findByIdAndUpdate(id, {
            festName,
            organisedBy,
            sponser,
            description,
            dateOfEvent,
            bannerPicture,
            festImages,
            theme,
            chiefGuest,
            festVideo,
            listOfActivities
        }, { new: true });
        if (!updatedFest) {
            return new APIError(statusCodeUtility.InternalServerError, "Fest not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Fest updated", updatedFest, response);
    }

    async deleteFest(request, response, next) {
        const { id } = request.params;
        const deletedFest = await festModel.findByIdAndDelete(id);
        if (!deletedFest) {
            return new APIError(statusCodeUtility.NotFound, "Fest not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Fest deleted", deletedFest, response);
    }

}



export default new FestController();