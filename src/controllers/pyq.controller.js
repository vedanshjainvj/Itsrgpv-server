import pyqModel from "../models/pyq.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PyqController {

    async getPyqs(request, response, next) {
        const Pyqs = await pyqModel.find({});
        if (!Pyqs) {
            return new APIError(statusCodeUtility.NotFound, "No Pyqs found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Pyqs found", Pyqs, response);
    }

    async getPyqById(request, response, next) {
        const Pyq = await pyqModel.findById(request.params.id);
        if (!Pyq) {
            return new APIError(statusCodeUtility.NotFound, "Pyq not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Pyq found", Pyq, response);
    }

    async addPyq(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { subjectName, paperPublishYear, semester, paperType, paperForYear, department, questionPaperImg, College } = request.body;
        const newPyq = await pyqModel.create({
            subjectName,
            paperPublishYear,
            semester,
            paperType,
            paperForYear,
            department,
            questionPaperImg,
            College
        });

        if (!newPyq) {
            return new APIError(statusCodeUtility.InternalServerError, "Pyq not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Pyq added", newPyq, response);
    }

    async editPyq(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { subjectName, paperPublishYear, semester, paperType, paperForYear, department, questionPaperImg, College } = request.body;
        const updatedPyq = await pyqModel.findByIdAndUpdate(request.params.id, {
            subjectName,
            paperPublishYear,
            semester,
            paperType,
            paperForYear,
            department,
            questionPaperImg,
            College
        });

        if (!updatedPyq) {
            return new APIError(statusCodeUtility.InternalServerError, "Pyq not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Pyq updated", updatedPyq, response);
    }

    async deletePyq(request, response, next) {
        const Pyq = await pyqModel.findByIdAndDelete(request.params.id);
        if (!Pyq) {
            return new APIError(statusCodeUtility.NotFound, "Pyq not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Pyq deleted", Pyq, response);
    }

}
export default new PyqController();