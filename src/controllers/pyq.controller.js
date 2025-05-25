import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import pyqServices from "../services/pyq.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class PyqController {

    static async getPyqs(request, response, next) {
      
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Pyqs = await pyqServices.getAllPyqs(page, limit);
            if (!Pyqs) {
                throw new APIError(statusCodeUtility.NotFound, "No Pyqs found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Pyqs found", Pyqs, response);
    }

    static async getPyqById(request, response, next) {
            if (!request.params || !request.params.id) {
                throw new APIError(statusCodeUtility.BadRequest, "PYQ ID is required");
            }
            const id = request.params.id;
            const Pyq = await pyqServices.findPyqById(id);
            if (!Pyq) {
                throw new APIError(statusCodeUtility.NotFound, "Pyq not found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Pyq found", Pyq, response);
   
    }

    static async addPyq(request, response, next) {
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { subjectName, subjectCode, paperPublishYear, semester, paperType, 
                   paperForYear, department, questionPaperImg, college } = request.body;
            
            if (!subjectName || !subjectCode|| !paperPublishYear || !semester || !paperType || 
                !paperForYear || !department || !college) {
               throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }

            let questionPaperUrl = null;
            if (request.file) {
                questionPaperUrl = request.file.path;
            }
            
            const data = {
                subjectName,
                paperPublishYear,
                semester : Number(semester),
                paperType,
                paperForYear,
                department,
                questionPaperImg : questionPaperUrl,
                college,
                subjectCode
            };
            
            const newPyq = await pyqServices.createPyq(data);
            if (!newPyq) {
                throw new APIError(statusCodeUtility.InternalServerError, "Pyq not added");
            }
            return ResponseHandler(statusCodeUtility.Created, "Pyq added", newPyq, response);
    }

    static async editPyq(request, response, next) {
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "PYQ ID is required");
            }
                   const getDataById = await pyqServices.findPyqById(id);
                    if (!getDataById) {
                        throw new APIError(statusCodeUtility.NotFound, "Invalid pyq id...")
                    }
            const validFields = ["subjectName", "paperPublishYear", "semester", "paperType", 
                               "paperForYear", "department", "questionPaperImg", "College"];
                               
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
            updateData.questionPaperImg = request.file.path;
        }
            
            if (Object.keys(updateData).length === 0) {
               throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }
            
            const updatedPyq = await pyqServices.editPyq(id, updateData);
            
            if (!updatedPyq) {
                throw new APIError(statusCodeUtility.NotFound, "Pyq not found");
            }
                   if(request.file && getDataById.questionPaperImg){
                await deleteSingleFile(getDataById.questionPaperImg);
                }
            return ResponseHandler(statusCodeUtility.Success, "Pyq updated", updatedPyq, response);
  
    }

    static async deletePyq(request, response, next) {
        
            const { id } = request.params;
            if (!id) {
               throw new APIError(statusCodeUtility.BadRequest, "PYQ ID is required");
            }
                  const getDataById = await pyqServices.findPyqById(id);
                    if (!getDataById) {
                        throw new APIError(statusCodeUtility.NotFound, "Invalid pyq id...")
                    }
            const deletedPyq = await pyqServices.deletePyq(id);
            if (!deletedPyq) {
               throw new APIError(statusCodeUtility.NotFound, "Pyq not found");
            }
                if(getDataById.questionPaperImg){
                await deleteSingleFile(getDataById.questionPaperImg);
                }
            return ResponseHandler(statusCodeUtility.Success, "Pyq deleted", deletedPyq, response);
    
    }
}

export default PyqController;