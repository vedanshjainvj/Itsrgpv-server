import departmentModel from "../models/department.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class DepartmentController {
    async getDepartments(request, response, next) {
        const Departments = await departmentModel.find({});
        if (!Departments) {
            return new APIError(statusCodeUtility.NotFound, "No Departments found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Departments found", Departments, response);
    }

    async getDepartmentById(request, response, next) {
        if (!request.params) {
            return new APIError(statusCodeUtility.NotFound, "No Departments found");
        }
        const Department = await departmentModel.findById({ _id: request.params.id });
        return ResponseHandler(statusCodeUtility.Success, "Department found", Department, response);
    }

    async addDepartment(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { departmentName, descriptionOfDepartment, headOfDepartment, totalSeats, yearOfEshtalishment, contactEmail, departmentImages, contactPhone } = request.body;

        const newDepartment = await departmentModel.create({
            departmentName,
            descriptionOfDepartment,
            headOfDepartment,
            totalSeats,
            yearOfEshtalishment,
            contactEmail,
            departmentImages,
            contactPhone
        });
        if (!newDepartment) {
            return new APIError(statusCodeUtility.InternalServerError, "Department not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Department added", newDepartment, response);
    }

    async editDepartment(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { id } = request.params;
        const { departmentName, descriptionOfDepartment, headOfDepartment, totalSeats, yearOfEshtalishment, contactEmail, departmentImages, contactPhone } = request.body;

        const updatedDepartment = await departmentModel.findByIdAndUpdate({ _id: id }, {
            departmentName,
            descriptionOfDepartment,
            headOfDepartment,
            totalSeats,
            yearOfEshtalishment,
            contactEmail,
            departmentImages,
            contactPhone
        }, { new: true });
        if (!updatedDepartment) {
            return new APIError(statusCodeUtility.InternalServerError, "Department not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Department updated", updatedDepartment, response);
    }

    async deleteDepartment(request, response, next) {
        const { id } = request.params;
        const deletedDepartment = await departmentModel.findByIdAndDelete
            ({ _id: id });
        if (!deletedDepartment) {
            return new APIError(statusCodeUtility.InternalServerError, "Department not deleted");
        }
        return ResponseHandler(statusCodeUtility.Success, "Department deleted", deletedDepartment, response);
    }

}
export default new DepartmentController();