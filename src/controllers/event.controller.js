import eventServices from "../services/event.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class EventController {

    static async getEvents(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;

            const Events = await eventServices.getAllEvents(page, limit);
            if (!Events) {
                return next(new APIError(statusCodeUtility.NotFound, "No Events found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Events found", Events, response);
        } catch (error) {
            next(error);
        }
    }

    static async getEventById(request, response, next) {
        try {
            if (!request.params) {
                return next(new APIError(statusCodeUtility.NotFound, "No Events found"));
            }
            const { id } = request.params;
            const Event = await eventServices.findEventById(id);
            if (!Event) {
                return next(new APIError(statusCodeUtility.NotFound, "Event not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Event found", Event, response);
        } catch (error) {
            next(error);
        }
    }

    static async addEvent(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }

            const { eventName, description, organisedBy, venue, dateOfEvent,
                bannerPicture, eventImages, eventType, targetAudience, tags } = request.body;

            if (!eventName || !description || !organisedBy || !venue) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }

            const bannerUrl = request.files["bannerPicture"]
                ? request.files["bannerPicture"][0].path
                : null;
            const eventImageUrl = request.files["eventImages"]
                ? request.files["eventImages"].map((file) => file.path)
                : [];


            const data = {
                eventName,
                description,
                organisedBy,
                venue,
                dateOfEvent,
                bannerPicture: bannerUrl,
                eventImages: eventImageUrl,
                eventType,
                targetAudience,
                tags
            };

            const newEvent = await eventServices.createEvent(data);
            if (!newEvent) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Event not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Event added", newEvent, response);
        } catch (error) {
            next(error);
        }
    }

    static async editEvent(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }

            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Event ID is required"));
            }

            const validFields = ["eventName", "description", "organisedBy", "venue", "dateOfEvent",
                "bannerPicture", "eventImages", "eventType", "targetAudience", "tags"];

            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});

            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }

            const updatedEvent = await eventServices.editEvent(id, updateData);

            if (!updatedEvent) {
                return next(new APIError(statusCodeUtility.NotFound, "Event not found"));
            }

            return ResponseHandler(statusCodeUtility.Success, "Event updated", updatedEvent, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteEvent(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Event ID is required"));
            }
            const deletedEvent = await eventServices.deleteEvent(id);
            if (!deletedEvent) {
                return next(new APIError(statusCodeUtility.NotFound, "Event not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Event deleted", deletedEvent, response);
        } catch (error) {
            next(error);
        }
    }
}

export default EventController;