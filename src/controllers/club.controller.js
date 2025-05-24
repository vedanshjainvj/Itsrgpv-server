import clubServices from "../services/club.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class ClubController {

    static async getClubs(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 30;

            const Clubs = await clubServices.getAllClubs(page, limit);

            if (!Clubs) {
                return next(new APIError(statusCodeUtility.NotFound, "No Clubs found"));
            }

            return ResponseHandler(statusCodeUtility.Success, "Clubs found", Clubs, response);
        } catch (error) {
            next(error);
        }
    }

    static async getClubById(request, response, next) {
        try {
            if (!request.params) {
                return next(new APIError(statusCodeUtility.NotFound, "No Clubs found"));
            }
            const id = request.params.id;
            const Club = await clubServices.findClubById(id);
            if (!Club) {
                return next(new APIError(statusCodeUtility.NotFound, "Club not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Club found", Club, response);
        } catch (error) {
            next(error);
        }
    }

    
    static async addClub(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
    
            const { clubName, founderName, description, typeOfClub, dateOfeshtablishment,
                contactEmail, contactPhone, socialLinks } = request.body;
    
            if (!clubName || !founderName || !description || !typeOfClub) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
    
            // Handle image upload if provided
            let logoUrl = null;
            let coverUrl = null;
    
            if (request.files) {
                if (request.files.logoImg) {
                    logoUrl = request.files.logoImg[0].path;  // Cloudinary URL for logo
                }
                if (request.files.coverImg) {
                    coverUrl = request.files.coverImg[0].path;  // Cloudinary URL for cover image
                }
            }
            // console.log("LOGO",logoUrl);
            // console.log("COVER",coverUrl);
            
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
                logoImg: logoUrl,  // Save the logo URL
                coverImg: coverUrl  // Save the cover image URL
            };
    
            const newClub = await clubServices.createClub(data);
            if (!newClub) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Club not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Club added", newClub, response);
        } catch (error) {
            next(error);
        }
    }

    static async editClub(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }

            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Club ID is required"));
            }

            const validFields = ["clubName", "founderName", "description", "typeOfClub",
                "dateOfeshtablishment", "contactEmail", "contactPhone",
                "socialLinks", "logoCoverImg"];

            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});

            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }

            const updatedClub = await clubServices.editClub(id, updateData);

            if (!updatedClub) {
                return next(new APIError(statusCodeUtility.NotFound, "Club not found"));
            }

            return ResponseHandler(statusCodeUtility.Success, "Club updated", updatedClub, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteClub(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Club ID is required"));
            }
            const deletedClub = await clubServices.deleteClub(id);
            if (!deletedClub) {
                return next(new APIError(statusCodeUtility.NotFound, "Club not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Club deleted", deletedClub, response);
        } catch (error) {
            next(error);
        }
    }
}
export default ClubController;