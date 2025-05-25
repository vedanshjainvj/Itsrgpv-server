import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import notesServices from "../services/notes.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class NotesController {
    static async getNotes(request, response, next) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        const Notes = await notesServices.getAllNotes(page, limit);
        if (!Notes) {
            throw new APIError(statusCodeUtility.NotFound, "No notes found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes found", Notes, response);
    }

    static async getNotesById(request, response, next) {

        if (!request.params || !request.params.id) {
            throw new APIError(statusCodeUtility.BadRequest, "Note ID is required");
        }
        const id = request.params.id;
        const Notes = await notesServices.findNotesById(id);
        if (!Notes) {
            return next(new APIError(statusCodeUtility.NotFound, "Notes not found"));
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes found", Notes, response);
    }

    static async addNotes(request, response, next) {
        if (!request.body) {
            return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
        }

        const { subjectName, subjectCode, contactNumber, department, semester, nameOfPerson,
            batchOfPerson, description, hashtags } = request.body;

        if (!subjectName || !subjectCode || !contactNumber ||
            !department || !semester || !nameOfPerson || !batchOfPerson) {
            return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
        }

        let thumbnailPictureUrl = null;
        let notesFileUrl = null;

        if (request.files?.thumbnailPicture) {
            thumbnailPictureUrl = request.files.thumbnailPicture[0].path;
        }
        if (request.files?.notesFile) {
            notesFileUrl = request.files.notesFile[0].path;
        }

        const data = {
            subjectName,
            subjectCode,
            contactNumber,
            thumbnailPicture: thumbnailPictureUrl,
            notesFile: notesFileUrl,
            department,
            semester: Number(semester),
            nameOfPerson,
            batchOfPerson,
            description,
            hashtags: hashtags ? hashtags.split(',') : [],
        };

        const newNotes = await notesServices.createNotes(data);
        if (!newNotes) {
            throw new APIError(statusCodeUtility.InternalServerError, "Notes not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Notes added", newNotes, response);
    }

    static async editNotes(request, response, next) {

        if (!request.body) {
            return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
        }

        const { id } = request.params;
        if (!id) {
            return next(new APIError(statusCodeUtility.BadRequest, "Notes ID is required"));
        }
        const getDataById = await notesServices.findNotesById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid notes id...")
        }
        const validFields = ["subjectName", "subjectCode", "contactNumber",
            "thumbnailPicture", "department", "semester"];

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

        if (request.files?.thumbnailPicture) {
            updateData.thumbnailPicture = request.files.thumbnailPicture[0].path;
        }
        if (request.files?.notesFile) {
            updateData.notesFile = request.files.notesFile[0].path;
        }

        if (Object.keys(updateData).length === 0) {
            throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
        }

        const updatedNotes = await notesServices.editNotes(id, updateData);

        if (!updatedNotes) {
            throw new APIError(statusCodeUtility.NotFound, "Notes not found");
        }
        if (request.files&&request.files?.notesFile&&getDataById.notesFile) {
            const url = getDataById.notesFile;
            await deleteSingleFile(url);
        }
        if (request.files&&request.files?.thumbnailPicture&&getDataById.thumbnailPicture) {
            const url = getDataById.thumbnailPicture;
            await deleteSingleFile(url);
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes updated", updatedNotes, response);
    }

    static async deleteNotes(request, response, next) {

        const { id } = request.params;
        if (!id) {
            throw new APIError(statusCodeUtility.BadRequest, "Notes ID is required");
        }
        const getDataById = await notesServices.findNotesById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid notes id...")
        }
        const deletedNotes = await notesServices.deleteNotes(id);
        if (!deletedNotes) {
            throw new APIError(statusCodeUtility.NotFound, "Notes not found");
        }
        if (getDataById.notesFile) {
            const url = getDataById.notesFile;
            await deleteSingleFile(url);
        }
        if (getDataById.thumbnailPicture) {
            const url = getDataById.thumbnailPicture;
            await deleteSingleFile(url);
        }
        return ResponseHandler(statusCodeUtility.Success, "Notes deleted", deletedNotes, response);
    }
}

export default NotesController;