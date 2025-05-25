import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import clubServices from "../services/club.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class ClubController {

    static async getClubs(request, response, next) {

        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 20;

        const Clubs = await clubServices.getAllClubs(page, limit);

        if (!Clubs) {
            APIError(statusCodeUtility.NotFound, "No Clubs found");
        }

        return ResponseHandler(statusCodeUtility.Success, "Clubs found", Clubs, response);
    }

    static async getClubById(request, response, next) {
        if (!request.params) {
            return next(new APIError(statusCodeUtility.NotFound, "No Clubs found"));
        }
        const id = request.params.id;
        const Club = await clubServices.findClubById(id);
        if (!Club) {
            return next(new APIError(statusCodeUtility.NotFound, "Club not found"));
        }
        return ResponseHandler(statusCodeUtility.Success, "Club found", Club, response);
    }

    static async addClub(request, response, next) {
        if (!request.body) {
            return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
        }

        const { clubName, founderName, description, typeOfClub, dateOfeshtablishment,
            contactEmail, socialLinks } = request.body;

        if (!clubName || !founderName || !description || !typeOfClub) {
            return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
        }

        let logoUrl = null;
        let coverUrl = null;

        if (request.files) {
            if (request.files.logoImg) {
                logoUrl = request.files.logoImg[0].path;
            }
            if (request.files.coverImg) {
                coverUrl = request.files.coverImg[0].path;
            }
        }
        // Handle phone numbers
        const contactNumber = Array.isArray(request.body.contactPhone)
            ? request.body.contactPhone
            : request.body.contactPhone.split(',').map((num) => num.trim());

        const data = {
            clubName,
            founderName,
            description,
            typeOfClub,
            dateOfeshtablishment,
            contactEmail,
            contactPhone: contactNumber,
            socialLinks,
            logoImg: logoUrl,
            coverImg: coverUrl
        };

        const newClub = await clubServices.createClub(data);
        if (!newClub) {
            return next(new APIError(statusCodeUtility.InternalServerError, "Club not added"));
        }

        return ResponseHandler(statusCodeUtility.Created, "Club added", newClub, response);

    }

    static async editClub(request, response, next) {
        if (!request.body) {
            return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
        }

        const { id } = request.params;

        if (!id) {
            return next(new APIError(statusCodeUtility.BadRequest, "Club ID is required"));
        }

        const getDataById = await clubServices.findClubById(id);
            if(!getDataById){
              throw new APIError(statusCodeUtility.NotFound,"Invalid club id...")
             }
        const validFields = ["clubName", "founderName", "description", "typeOfClub",
            "dateOfeshtablishment", "contactEmail", "contactPhone", "logoImg", "coverImg",
            "socialLinks"];
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
            if (request.files.logoImg) {
                updateData.logoUrl = request.files.logoImg[0].path;
            }
            if (request.files.coverImg) {
                updateData.coverUrl = request.files.coverImg[0].path;
            }
        }

        if (Object.keys(updateData).length === 0) {
            return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
        }

        const updatedClub = await clubServices.editClub(id, updateData);

        if (!updatedClub) {
            return next(new APIError(statusCodeUtility.NotFound, "Club not found"));
        }
        if (request.files && request.files.logoImg &&  getDataById.logoUrl) {
            const url = getDataById.logoUrl;
            await deleteSingleFile(url);
        }
        if (request.files && request.files.coverUrl && getDataById.coverUrl) {
            const url = getDataById.coverUrl;
            await deleteSingleFile(url);
        }
        return ResponseHandler(statusCodeUtility.Success, "Club updated", updatedClub, response);
    }

    static async deleteClub(request, response, next) {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Club ID is required"));
            }
            const getDataById = await clubServices.findClubById(id);
               if(!getDataById){
              throw new APIError(statusCodeUtility.NotFound,"Invalid club id...")
             }
            const deletedClub = await clubServices.deleteClub(id);
            if (!deletedClub) {
                return next(new APIError(statusCodeUtility.NotFound, "Club not found"));
            }
        
            if (getDataById.logoUrl) {
            const url = getDataById.logoUrl;
            await deleteSingleFile(url);
           }
        if (getDataById.coverUrl) {
            const url = getDataById.coverUrl;
            await deleteSingleFile(url);
        }
            return ResponseHandler(statusCodeUtility.Success, "Club deleted", deletedClub, response);
    }
}
export default ClubController;