import startupModel from "../models/startup.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class Startup {
    async getStartups(request, response, next) {
        const Startups = await startupModel.find({});
        if (!Startups) {
            return new APIError(statusCodeUtility.NotFound, "No Startups found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Startups found", Startups, response);
    }

    async getStartupById(request, response, next) {
        const Startup = await startupModel.findById(request.params.id);
        if (!Startup) {
            return new APIError(statusCodeUtility.NotFound, "Startup not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Startup found", Startup, response);
    }

    async addStartup(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { startupName, slogan, description, startupCategory, dateOfEshtablishment, startupLogo, founder, contactEmail, contactPhone, socialLinks, offilneLocation } = request.body;
       console.log(dateOfEshtablishment)
        const newStartup = await startupModel.create({
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
        });
        if (!newStartup) {
            return new APIError(statusCodeUtility.InternalServerError, "Startup not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Startup added", newStartup, response);
    }

    async editStartup(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { startupName, slogan, description, startupCategory, dateOfEshtablishment, startupLogo, founder, contactEmail, contactPhone, socialLinks, offilneLocation } = request.body;
        const updatedStartup = await startupModel.findByIdAndUpdate(request.params.id, {
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
        });
        if (!updatedStartup) {
            return new APIError(statusCodeUtility.InternalServerError, "Startup not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Startup updated", updatedStartup, response);
    }

    async deleteStartup(request, response, next) {
        const Startup = await startupModel.findByIdAndDelete(request.params.id);
        if (!Startup) {
            return new APIError(statusCodeUtility.NotFound, "Startup not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Startup deleted", Startup, response);
    }

}
export default new Startup();