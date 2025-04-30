import pyqServices from "../services/pyq.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PyqController {

    static async getPyqs(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Pyqs = await pyqServices.getAllPyqs(page, limit);
            if (!Pyqs) {
                return next(new APIError(statusCodeUtility.NotFound, "No Pyqs found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Pyqs found", Pyqs, response);
        } catch (error) {
            next(error);
        }
    }

    static async getPyqById(request, response, next) {
        try {
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "PYQ ID is required"));
            }
            const id = request.params.id;
            const Pyq = await pyqServices.findPyqById(id);
            if (!Pyq) {
                return next(new APIError(statusCodeUtility.NotFound, "Pyq not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Pyq found", Pyq, response);
        } catch (error) {
            next(error);
        }
    }

    static async addPyq(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { subjectName, paperPublishYear, semester, paperType, 
                   paperForYear, department, questionPaperImg, College } = request.body;
            
            if (!subjectName || !paperPublishYear || !semester || !paperType || 
                !paperForYear || !department || !College) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
            
            const data = {
                subjectName,
                paperPublishYear,
                semester,
                paperType,
                paperForYear,
                department,
                questionPaperImg,
                College
            };
            
            const newPyq = await pyqServices.createPyq(data);
            if (!newPyq) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Pyq not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Pyq added", newPyq, response);
        } catch (error) {
            next(error);
        }
    }

    static async editPyq(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "PYQ ID is required"));
            }
            
            const validFields = ["subjectName", "paperPublishYear", "semester", "paperType", 
                               "paperForYear", "department", "questionPaperImg", "College"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedPyq = await pyqServices.editPyq(id, updateData);
            
            if (!updatedPyq) {
                return next(new APIError(statusCodeUtility.NotFound, "Pyq not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Pyq updated", updatedPyq, response);
        } catch (error) {
            next(error);
        }
    }

    static async deletePyq(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "PYQ ID is required"));
            }
            const deletedPyq = await pyqServices.deletePyq(id);
            if (!deletedPyq) {
                return next(new APIError(statusCodeUtility.NotFound, "Pyq not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Pyq deleted", deletedPyq, response);
        } catch (error) {
            next(error);
        }
    }
}

export default PyqController;