
import notesModel from "../models/notes.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class NotesController {
    async getNotes(request, response, next) {
        const Notes = await notesModel.find({});
        if (!Notes) {
            return new APIError(statusCodeUtility.NotFound, "No notes found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes found", Notes, response);
    }


    async getNotesById(request, response, next) {
        const Notes = await notesModel.findById(request.params.id);
        if (!Notes) {
            return new APIError(statusCodeUtility.NotFound, "Notes not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes found", notes, response);
    }


    async addNotes(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { subjectName, branch, subjectCode, contactNumber, thumbnailPicture, year, department, semester } = request.body;
        const newNotes = await notesModel.create({
            subjectName,
            branch,
            subjectCode,
            contactNumber,
            thumbnailPicture,
            year,
            department,
            semester
        });
        if (!newNotes) {
            return new APIError(statusCodeUtility.InternalServerError, "Notes not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Notes added", newNotes, response);
    }

    async editNotes(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { subjectName, branch, subjectCode, contactNumber, thumbnailPicture, year, department, semester } = request.body;
        const updatedNotes = await notesModel.findByIdAndUpdate(request.params.id, {
            subjectName,
            branch,
            subjectCode,
            contactNumber,
            thumbnailPicture,
            year,
            department,
            semester
        }, { new: true });
        if (!updatedNotes) {
            return new APIError(statusCodeUtility.InternalServerError, "Notes not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes updated", updatedNotes, response);
    }

    async deleteNotes(request, response, next) {
        const deletedNotes = await notesModel.findByIdAndDelete(request.params.id);
        if (!deletedNotes) {
            return new APIError(statusCodeUtility.NotFound, "Notes not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes deleted", deletedNotes, response);
    }


}
export default new NotesController();
