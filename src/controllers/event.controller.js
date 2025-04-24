import eventModel from "../models/event.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class EventController {
    async getEvents(request, response, next) {
        const Events = await eventModel.find({});
        if (!Events) {
            return new APIError(statusCodeUtility.NotFound, "No Events found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Event found", Events, response);
    }

    async getEventById(request, response, next) {
        const { id } = request.params;
        const Event = await eventModel.findById(id);
        if (!Event) {
            return new APIError(statusCodeUtility.NotFound, "Event not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Event found", Event, response);
    }

    async addEvent(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { eventName, description, organisedBy, venue, dateOfEvent, bannerPicture, eventImages, eventType, targetAudience, tags } = request.body;
        const newEvent = await eventModel.create({
            eventName,
            description,
            organisedBy,
            venue,
            dateOfEvent,
            bannerPicture,
            eventImages,
            eventType,
            targetAudience,
            tags
        });
        if (!newEvent) {
            return new APIError(statusCodeUtility.InternalServerError, "Event not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Event added", newEvent, response);
    }

    async editEvent(request, response, next) {
        const { id } = request.params;
        const { eventName, description, organisedBy, venue, dateOfEvent, bannerPicture, eventImages, eventType, targetAudience, tags } = request.body;
        const updatedEvent = await eventModel.findByIdAndUpdate(id, {
            eventName,
            description,
            organisedBy,
            venue,
            dateOfEvent,
            bannerPicture,
            eventImages,
            eventType,
            targetAudience,
            tags
        }, { new: true });
        if (!updatedEvent) {
            return new APIError(statusCodeUtility.NotFound, "Event not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Event updated", updatedEvent, response);
    }

    async deleteEvent(request, response, next) {
        const { id } = request.params;
        const deletedEvent = await eventModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            return new APIError(statusCodeUtility.NotFound, "Event not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Event deleted", deletedEvent, response);
    }
    



}
export default new EventController();