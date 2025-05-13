import notesServices from "../services/notes.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class NotesController {
    static async getNotes(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Notes = await notesServices.getAllNotes(page, limit);
            if (!Notes) {
                return next(new APIError(statusCodeUtility.NotFound, "No notes found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Notes found", Notes, response);
        } catch (error) {
            next(error);
        }
    }

    static async getNotesById(request, response, next) {
        try {
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Note ID is required"));
            }
            const id = request.params.id;
            const Notes = await notesServices.findNotesById(id);
            if (!Notes) {
                return next(new APIError(statusCodeUtility.NotFound, "Notes not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Notes found", Notes, response);
        } catch (error) {
            next(error);
        }
    }

    static async addNotes(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { subjectName, branch, subjectCode, contactNumber, 
                    year, department, semester, nameOfPerson, 
                    batchOfPerson, description, hashtags, pagesNumber, fileSize } = request.body;
            
            if (!subjectName || !branch || !subjectCode || !contactNumber || 
                !department || !semester || !nameOfPerson || !batchOfPerson) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
    
            let thumbnailPictureUrl = null;
            let notesFileUrl = null;

            // ✅ Handling uploaded files
            if (request.files?.thumbnailPicture) {
                thumbnailPictureUrl = request.files.thumbnailPicture[0].path;
            }
            if (request.files?.notesFile) {
                notesFileUrl = request.files.notesFile[0].path;
            }
    
            const data = {
                subjectName,
                branch,
                subjectCode,
                contactNumber,
                thumbnailPicture : thumbnailPictureUrl,
                notesFile : notesFileUrl,           // Storing the notes file URL
                year : Number(year),
                department,
                semester : Number(semester),
                nameOfPerson,
                batchOfPerson,
                description,
                hashtags: hashtags ? hashtags.split(',') : [], // Convert to array
                pagesNumber: Number(pagesNumber) || 0,
                fileSize: Number(fileSize) || 0, 
                uploadedOn: new Date()  // Automatically setting upload date
            };
    
            const newNotes = await notesServices.createNotes(data);
            if (!newNotes) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Notes not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Notes added", newNotes, response);
        } catch (error) {
            next(error);
        }
    }

    static async editNotes(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Notes ID is required"));
            }
            
            const validFields = ["subjectName", "branch", "subjectCode", "contactNumber", 
                               "thumbnailPicture", "year", "department", "semester"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedNotes = await notesServices.editNotes(id, updateData);
            
            if (!updatedNotes) {
                return next(new APIError(statusCodeUtility.NotFound, "Notes not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Notes updated", updatedNotes, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteNotes(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Notes ID is required"));
            }
            const deletedNotes = await notesServices.deleteNotes(id);
            if (!deletedNotes) {
                return next(new APIError(statusCodeUtility.NotFound, "Notes not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Notes deleted", deletedNotes, response);
        } catch (error) {
            next(error);
        }
    }
}

export default NotesController;