import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import startupServices from "../services/startup.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class StartupController {
    async getStartups(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Startups = await startupServices.getAllStartups(page, limit);
            if (!Startups) {
                throw new APIError(statusCodeUtility.NotFound, "No Startups found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Startups found", Startups, response);
    }

    async getStartupById(request, response, next) {
            if (!request.params || !request.params.id) {
               throw new APIError(statusCodeUtility.BadRequest, "Startup ID is required");
            }
            
            const id = request.params.id;
            const Startup = await startupServices.findStartupById(id);
            
            if (!Startup) {
                throw new APIError(statusCodeUtility.NotFound, "Startup not found");
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Startup found", Startup, response);
    }

    async addStartup(request, response, next) {
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { startupName, slogan, description, startupCategory, dateOfEshtablishment, 
                    founder, contactEmail, contactPhone, socialLinks, offilneLocation } = request.body;
            
            if (!startupName || !description || !startupCategory || 
                !contactEmail || !contactPhone) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }

            let startupLogoUrl = null;
            if(request.file) {
                startupLogoUrl = request.file.path;
            }
            
            const data = {
                startupName,
                slogan,
                description,
                startupCategory,
                dateOfEshtablishment,
                startupLogo : startupLogoUrl,
                founder,
                contactEmail,
                contactPhone,
                socialLinks,
                offilneLocation
            };
            
            const newStartup = await startupServices.createStartup(data);
            
            if (!newStartup) {
                throw new APIError(statusCodeUtility.InternalServerError, "Startup not added");
            }
            
            return ResponseHandler(statusCodeUtility.Created, "Startup added", newStartup, response);
    }

    async editStartup(request, response, next) {
                if (!request.body) {
               throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Startup ID is required");
            }
                      const getDataById = await startupServices.findStartupById(id);

                                if (!getDataById) {
                                    throw new APIError(statusCodeUtility.NotFound, "Invalid placement id...")
                                }
            const validFields = ["startupName", "slogan", "description", "startupCategory", "dateOfEshtablishment",
                               "startupLogo", "founder", "contactEmail", "contactPhone", "socialLinks", 
                               "offilneLocation"];
                               
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
        
           if (request.file) {
            updateData.startupLogo = request.file.path;
        }
            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }
            
            const updatedStartup = await startupServices.editStartup(id, updateData);
            
            if (!updatedStartup) {
                throw new APIError(statusCodeUtility.NotFound, "Startup not found");
            }
                   if(request.file && getDataById.startupLogo){
                await deleteSingleFile(getDataById.startupLogo);
                }
            return ResponseHandler(statusCodeUtility.Success, "Startup updated", updatedStartup, response);
     
    }

    async deleteStartup(request, response, next) {
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Startup ID is required");
            }
                 const getDataById = await startupServices.findStartupById(id);

                                if (!getDataById) {
                                    throw new APIError(statusCodeUtility.NotFound, "Invalid placement id...")
                                }
            const deletedStartup = await startupServices.deleteStartup(id);
            
            if (!deletedStartup) {
                throw new APIError(statusCodeUtility.NotFound, "Startup not found");
            }
              if(getDataById.startupLogo){
                await deleteSingleFile(getDataById.startupLogo);
                }
            return ResponseHandler(statusCodeUtility.Success, "Startup deleted", deletedStartup, response);
      
    }
}

export default new StartupController();