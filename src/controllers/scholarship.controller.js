import scholarshipModel from '../models/scholarship.model.js';
import APIError from '../utils/APIError.js';
import ResponseHandler from '../utils/APIResponse.js';
import statusCodeUtility from '../utils/statusCodeUtility.js';

class ScholarshipModel {

    async getScholarships(request, response, next) {
        const Scholarships = await scholarshipModel.find({});
        if (!Scholarships) {
            return new APIError(statusCodeUtility.NotFound, "No Scholarships found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Scholarships found", Scholarships, response);
    }

    async getScholarshipById(request, response, next) {
        const Scholarship = await scholarshipModel.findById(request.params.id);
        if (!Scholarship) {
            return new APIError(statusCodeUtility.NotFound, "Scholarship not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Scholarship found", Scholarship, response);
    }

    async addScholarship(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { organisationName, organisationType, applyUrl, amount, eligibilityCriteria, documentRequired, contactInfo } = request.body;

        const newScholarship = await scholarshipModel.create({
            organisationName,
            organisationType,
            applyUrl,
            amount,
            eligibilityCriteria,
            documentRequired,
            contactInfo
        });

        if (!newScholarship) {
            return new APIError(statusCodeUtility.InternalServerError, "Scholarship not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Scholarship added", newScholarship, response);
    }

    async editScholarship(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { organisationName, organisationType, applyUrl, amount, eligibilityCriteria, documentRequired, contactInfo } = request.body;
        const updatedScholarship = await scholarshipModel.findByIdAndUpdate(request.params.id, {
            organisationName,
            organisationType,
            applyUrl,
            amount,
            eligibilityCriteria,
            documentRequired,
            contactInfo
        });

        if (!updatedScholarship) {
            return new APIError(statusCodeUtility.InternalServerError, "Scholarship not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Scholarship updated", updatedScholarship, response);
    }

    async deleteScholarship(request, response, next) {
        const deletedScholarship = await scholarshipModel.findByIdAndDelete(request.params.id);
        if (!deletedScholarship) {
            return new APIError(statusCodeUtility.NotFound, "Scholarship not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Scholarship deleted", deletedScholarship, response);
    }


}

export default new ScholarshipModel();