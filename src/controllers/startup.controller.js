import startupServices from "../services/startup.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class StartupController {
    async getStartups(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Startups = await startupServices.getAllStartups(page, limit);
            if (!Startups) {
                return next(new APIError(statusCodeUtility.NotFound, "No Startups found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Startups found", Startups, response);
        } catch (error) {
            next(error);
        }
    }

    async getStartupById(request, response, next) {
        try {
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Startup ID is required"));
            }
            
            const id = request.params.id;
            const Startup = await startupServices.findStartupById(id);
            
            if (!Startup) {
                return next(new APIError(statusCodeUtility.NotFound, "Startup not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Startup found", Startup, response);
        } catch (error) {
            next(error);
        }
    }

    async addStartup(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { startupName, slogan, description, startupCategory, dateOfEshtablishment, 
                   startupLogo, founder, contactEmail, contactPhone, socialLinks, offilneLocation } = request.body;
            
            if (!startupName || !description || !startupCategory || !dateOfEshtablishment || 
                !contactEmail || !contactPhone) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
            
            const data = {
                startupName,
                slogan,
                description,
                startupCategory,
                dateOfEshtablishment,
                startupLogo,
                founder,
                contactEmail,
                contactPhone,
                socialLinks,
                offilneLocation
            };
            
            const newStartup = await startupServices.createStartup(data);
            
            if (!newStartup) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Startup not added"));
            }
            
            return ResponseHandler(statusCodeUtility.Created, "Startup added", newStartup, response);
        } catch (error) {
            next(error);
        }
    }

    async editStartup(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Startup ID is required"));
            }
            
            const validFields = ["startupName", "slogan", "description", "startupCategory", "dateOfEshtablishment",
                               "startupLogo", "founder", "contactEmail", "contactPhone", "socialLinks", 
                               "offilneLocation"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedStartup = await startupServices.editStartup(id, updateData);
            
            if (!updatedStartup) {
                return next(new APIError(statusCodeUtility.NotFound, "Startup not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Startup updated", updatedStartup, response);
        } catch (error) {
            next(error);
        }
    }

    async deleteStartup(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Startup ID is required"));
            }
            
            const deletedStartup = await startupServices.deleteStartup(id);
            
            if (!deletedStartup) {
                return next(new APIError(statusCodeUtility.NotFound, "Startup not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Startup deleted", deletedStartup, response);
        } catch (error) {
            next(error);
        }
    }
}

export default new StartupController();