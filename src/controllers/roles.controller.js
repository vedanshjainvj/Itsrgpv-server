import roleServices from "../services/role.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class RoleController {

    async addRole(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.NotFound, "No body will not fount"));
            }
            
            const {data} = request.body;
            const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
            
            if(decodedData.secretKey != process.env.SecretPin){
                return next(new APIError(statusCodeUtility.Conflict, "Enter correct pin"));
            }
            
            const date = new Date();
            const roleData = {roleName: decodedData.roleName, createdDate: date};
            
            const newRole = await roleServices.createRole(roleData);
            
            return ResponseHandler(statusCodeUtility.Success, "Role added", newRole, response);
        } catch (error) {
            next(error);
        }
    }

    async getAllRole(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const roles = await roleServices.getAllRoles(page, limit);
            
            if (!roles) {
                return next(new APIError(statusCodeUtility.NotFound, "No roles found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Roles found", roles, response);
        } catch (error) {
            next(error);
        }
    }

    async editRole(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "NO data Provided"));
            }

            const { id } = request.params;
            const { roleName } = request.body;
            
            const editedRole = await roleServices.editRole(id, { roleName });
            
            if (!editedRole) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Role not edited"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Role edited", editedRole, response);
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(request, response, next) {
        try {
            const { id } = request.params;
            
            const deletedRole = await roleServices.deleteRole(id);
            
            if (!deletedRole) {
                return next(new APIError(statusCodeUtility.NotFound, "Role not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Role deleted", deletedRole, response);
        } catch (error) {
            next(error);
        }
    }
}

export default new RoleController();