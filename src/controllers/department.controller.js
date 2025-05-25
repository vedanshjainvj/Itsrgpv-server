import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import departmentServices from "../services/department.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class DepartmentController {

    static async getDepartments(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;

            const Departments = await departmentServices.getAllDepartments(page, limit);
            if (!Departments) {
               throw new APIError(statusCodeUtility.NotFound, "No Departments found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Departments found", Departments, response);
    }

    static async getDepartmentById(request, response, next) {
            if (!request.params) {
               throw new APIError(statusCodeUtility.NotFound, "No Departments found");
            }
            const id = request.params.id;
            const Department = await departmentServices.findDepartmentById(id);
            if (!Department) {
                throw new APIError(statusCodeUtility.NotFound, "Department not found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Department found", Department, response);
    }

    static async addDepartment(request, response, next) {
     
            if (!request.body) {
                throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }
            const { departmentName, descriptionOfDepartment, headOfDepartment, totalSeats,
                yearOfEstablishment, contactEmail, departmentImages, contactPhone } = request.body;

            if (!departmentName || !descriptionOfDepartment || !headOfDepartment ||
                !totalSeats || !yearOfEstablishment || !contactPhone) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }
            const images = request.files.map((file) => file.path);

            const data = {
                departmentName,
                descriptionOfDepartment,
                headOfDepartment,
                totalSeats : Number(totalSeats),
                yearOfEstablishment : Number(yearOfEstablishment),
                contactEmail,
                departmentImages: images,
                contactPhone: Number(contactPhone)
            };

            const newDepartment = await departmentServices.createDepartment(data);
            if (!newDepartment) {
               throw new APIError(statusCodeUtility.InternalServerError, "Department not added");
            }
            return ResponseHandler(statusCodeUtility.Created, "Department added", newDepartment, response);
    }

    static async editDepartment(request, response, next) {
     
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }

            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Department ID is required"));
            }
             const getDataById = await departmentServices.findDepartmentById(id);
            if(!getDataById){
              throw new APIError(statusCodeUtility.NotFound,"Invalid department id...")
             }
            const validFields = ["departmentName", "descriptionOfDepartment", "headOfDepartment",
                "totalSeats", "yearOfEstablishment", "contactEmail",
                "departmentImages", "contactPhone"];

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

         if(request.files){
             const existingImages = getDataById.departmentImages || []; 
             const newImagePaths = request.files.map((file) => file.path);
             updateData.departmentImages = [...existingImages, ...newImagePaths]; 
         }

            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }

            const updatedDepartment = await departmentServices.editDepartment(id, updateData);

            if (!updatedDepartment) {
                throw new APIError(statusCodeUtility.NotFound, "Department not found");
            }

            return ResponseHandler(statusCodeUtility.Success, "Department updated", updatedDepartment, response);
    }

    static async deleteDepartment(request, response, next) {
            const { id } = request.params;
            if (!id) {
                throw new APIError(statusCodeUtility.BadRequest, "Department ID is required");
            }
                 const getDataById = await departmentServices.findDepartmentById(id);
            if(!getDataById){
              throw new APIError(statusCodeUtility.NotFound,"Invalid department id...")
             }
            const deletedDepartment = await departmentServices.deleteDepartment(id);
            if (!deletedDepartment) {
                throw new APIError(statusCodeUtility.NotFound, "Department not found");
            }
            
    if (getDataById.departmentImages && getDataById.departmentImages.length > 0) {
    for (const url of getDataById.departmentImages) {
        await deleteSingleFile(url);
    }
}

            return ResponseHandler(statusCodeUtility.Success, "Department deleted", deletedDepartment, response);
    }
}

export default DepartmentController;