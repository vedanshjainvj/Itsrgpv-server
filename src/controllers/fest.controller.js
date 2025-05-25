import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import festServices from "../services/fest.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class FestController {
    static async getFest(request, response, next) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        const Fests = await festServices.getAllFests(page, limit);
        if (!Fests) {
            throw new APIError(statusCodeUtility.NotFound, "No Fests found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Fests found", Fests, response);
    }

    static async getFestById(request, response, next) {
        if (!request.params) {
            throw new APIError(statusCodeUtility.BadRequest, "No parameters provided");
        }
        const { id } = request.params;
        const Fest = await festServices.findFestById(id);
        if (!Fest) {
            throw new APIError(statusCodeUtility.NotFound, "Fest not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Fest found", Fest, response);
    }

    static async addFest(request, response, next) {

        if (!request.body) {
            throw new APIError(statusCodeUtility.BadRequest, "No data provided");
        }

        const { festName, organisedBy, sponsor, description, dateOfEvent, theme, chiefGuest, festVideo, listOfActivities } = request.body;

        if (!festName || !organisedBy || !description || !dateOfEvent) {
            throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
        }

        // Correcting the way to access the uploaded files
        const bannerUrl = request.files["bannerPicture"]
            ? request.files["bannerPicture"][0].path
            : null;

        const festImageUrl = request.files["festImages"]
            ? request.files["festImages"].map((file) => file.path) // Corrected this line
            : [];

        const data = {
            festName,
            organisedBy,
            sponsor,
            description,
            dateOfEvent,
            bannerPicture: bannerUrl,
            festImages: festImageUrl,
            theme,
            chiefGuest,
            festVideo,
            listOfActivities
        };

        const newFest = await festServices.createFest(data);
        if (!newFest) {
            throw new APIError(statusCodeUtility.InternalServerError, "Fest not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Fest added", newFest, response);
    }

    static async editFest(request, response, next) {

        if (!request.body) {
            throw new APIError(statusCodeUtility.BadRequest, "No data provided");
        }

        const { id } = request.params;
        if (!id) {
            throw new APIError(statusCodeUtility.BadRequest, "Fest ID is required");
        }

        const getDataById = await festServices.findFestById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid fest id...")
        }
        const validFields = ["festName", "organisedBy", "sponser", "description", "dateOfEvent",
            "bannerPicture", "festImages", "theme", "chiefGuest", "festVideo",
            "listOfActivities"];

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

            if (request.files["festImages"]) {
                const existingImages = getDataById.festImages || [];
                const newImagePaths = request.files["festImages"].map(file => file.path);
                updateData.festImages = [...existingImages, ...newImagePaths];
            }
        }

        if (Object.keys(updateData).length === 0) {
            throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
        }

        const updatedFest = await festServices.editFest(id, updateData);

        if (!updatedFest) {
            throw new APIError(statusCodeUtility.NotFound, "Fest not found");
        }
        if (request.files && request.files["bannerPicture"] && getDataById.bannerPicture) {
            const url = getDataById.bannerPicture;
            await deleteSingleFile(url);
        }
        return ResponseHandler(statusCodeUtility.Success, "Fest updated", updatedFest, response);
    }

    static async deleteFest(request, response, next) {
        const { id } = request.params;
        if (!id) {
           throw new APIError(statusCodeUtility.BadRequest, "Fest ID is required");
        }

        const getDataById = await festServices.findFestById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid fest id...")
        }
        const deletedFest = await festServices.deleteFest(id);
        if (!deletedFest) {
            throw new APIError(statusCodeUtility.NotFound, "Fest not found");
        }
        if (getDataById.bannerPicture) {
            const url = getDataById.bannerPicture;
            await deleteSingleFile(url);
        }
  if (getDataById.festImages && getDataById.festImages.length > 0) {
    for (const url of getDataById.festImages) {
        await deleteSingleFile(url);
    }
}

        return ResponseHandler(statusCodeUtility.Success, "Fest deleted", deletedFest, response);

    }
}

export default FestController;