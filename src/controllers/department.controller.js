import departmentServices from "../services/department.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class DepartmentController {

    static async getDepartments(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;

            const Departments = await departmentServices.getAllDepartments(page, limit);
            if (!Departments) {
                return next(new APIError(statusCodeUtility.NotFound, "No Departments found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Departments found", Departments, response);
        } catch (error) {
            next(error);
        }
    }

    static async getDepartmentById(request, response, next) {
        try {
            if (!request.params) {
                return next(new APIError(statusCodeUtility.NotFound, "No Departments found"));
            }
            const id = request.params.id;
            const Department = await departmentServices.findDepartmentById(id);
            if (!Department) {
                return next(new APIError(statusCodeUtility.NotFound, "Department not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Department found", Department, response);
        } catch (error) {
            next(error);
        }
    }

    static async addDepartment(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            const { departmentName, descriptionOfDepartment, headOfDepartment, totalSeats,
                yearOfEstablishment, contactEmail, departmentImages, contactPhone } = request.body;

            if (!departmentName || !descriptionOfDepartment || !headOfDepartment ||
                !totalSeats || !yearOfEstablishment || !contactPhone) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }

            // Get image URLs from Cloudinary
            const images = request.files.map((file) => file.path);
            console.log("Uploaded Images:", images);

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
                return next(new APIError(statusCodeUtility.InternalServerError, "Department not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Department added", newDepartment, response);
        } catch (error) {
            next(error);
        }
    }

    static async editDepartment(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }

            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Department ID is required"));
            }

            const validFields = ["departmentName", "descriptionOfDepartment", "headOfDepartment",
                "totalSeats", "yearOfEstablishment", "contactEmail",
                "departmentImages", "contactPhone"];

            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});

            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }

            const updatedDepartment = await departmentServices.editDepartment(id, updateData);

            if (!updatedDepartment) {
                return next(new APIError(statusCodeUtility.NotFound, "Department not found"));
            }

            return ResponseHandler(statusCodeUtility.Success, "Department updated", updatedDepartment, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteDepartment(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Department ID is required"));
            }
            const deletedDepartment = await departmentServices.deleteDepartment(id);
            if (!deletedDepartment) {
                return next(new APIError(statusCodeUtility.NotFound, "Department not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Department deleted", deletedDepartment, response);
        } catch (error) {
            next(error);
        }
    }
}

export default DepartmentController;