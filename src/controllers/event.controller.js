import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import eventServices from "../services/event.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class EventController {

    static async getEvents(request, response, next) {

        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        const Events = await eventServices.getAllEvents(page, limit);
        if (!Events) {
            throw new APIError(statusCodeUtility.NotFound, "No Events found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Events found", Events, response);
    }

    static async getEventById(request, response, next) {
        if (!request.params) {
            throw new APIError(statusCodeUtility.NotFound, "No Events found");
        }
        const { id } = request.params;
        const Event = await eventServices.findEventById(id);
        if (!Event) {
            throw new APIError(statusCodeUtility.NotFound, "Event not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Event found", Event, response);

    }

    static async addEvent(request, response, next) {
        if (!request.body) {
            throw new APIError(statusCodeUtility.BadRequest, "No data provided");
        }

        const { eventName, description, organisedBy, venue, dateOfEvent, eventType, targetAudience, tags } = request.body;

        if (!eventName || !description || !organisedBy || !venue) {
            throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
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
            throw new APIError(statusCodeUtility.InternalServerError, "Event not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Event added", newEvent, response);
    }

    static async editEvent(request, response, next) {

        if (!request.body) {
            throw new APIError(statusCodeUtility.BadRequest, "No data provided");
        }

        const { id } = request.params;
        if (!id) {
            throw new APIError(statusCodeUtility.BadRequest, "Event ID is required");
        }
        const getDataById = await eventServices.findEventById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid event id...")
        }
        const validFields = ["eventName", "description", "organisedBy", "venue", "dateOfEvent",
            "bannerPicture", "eventImages", "eventType", "targetAudience", "tags"];

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

        if (request.files) {
            if (request.files["bannerPicture"]) {
                updateData.bannerPicture = request.files["bannerPicture"][0].path;
            }

            if (request.files["eventImages"]) {
                const existingImages = getDataById.eventImages || [];
                const newImagePaths = request.files["eventImages"].map(file => file.path);
                updateData.eventImages = [...existingImages, ...newImagePaths];
            }
        }


        if (Object.keys(updateData).length === 0) {
            throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
        }

        const updatedEvent = await eventServices.editEvent(id, updateData);

        if (!updatedEvent) {
            throw new APIError(statusCodeUtility.NotFound, "Event not found");
        }
        if (request.files && request.files["eventImages"] && getDataById.bannerPicture) {
            const url = getDataById.bannerPicture;
            await deleteSingleFile(url);
        }
        return ResponseHandler(statusCodeUtility.Success, "Event updated", updatedEvent, response);

    }

    static async deleteEvent(request, response, next) {
        const { id } = request.params;
        if (!id) {
            throw new APIError(statusCodeUtility.BadRequest, "Event ID is required");
        }
        const getDataById = await eventServices.findEventById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid event id...")
        }
        const deletedEvent = await eventServices.deleteEvent(id);
        if (!deletedEvent) {
            throw new APIError(statusCodeUtility.NotFound, "Event not found");
        }
        if (getDataById.bannerPicture) {
            const url = getDataById.bannerPicture;
            await deleteSingleFile(url);
        }
        if (getDataById.eventImages && getDataById.eventImages.length > 0) {
            for (const url of getDataById.eventImages) {
                await deleteSingleFile(url);
            }
        }

        return ResponseHandler(statusCodeUtility.Success, "Event deleted", deletedEvent, response);

    }
}

export default EventController;