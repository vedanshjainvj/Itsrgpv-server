import userServices from "../services/user.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class UserController {
  async getUsers(request, response, next) {
      try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        
        const Users = await userServices.getAllUsers(page, limit);
        if (!Users) {
          return next(new APIError(statusCodeUtility.NotFound, "No Users found"));
        }
        return ResponseHandler(statusCodeUtility.Success, "Users found", Users, response);
      } catch (error) {
        next(error);
      }
  }

  async getUserById(request, response, next) {
    try {
      if (!request.params || !request.params.id) {
        return next(new APIError(statusCodeUtility.BadRequest, "User ID is required"));
      }
      
      const id = request.params.id;
      const User = await userServices.findUserById(id);
      
      if (!User) {
        return next(new APIError(statusCodeUtility.NotFound, "User not found"));
      }
      
      return ResponseHandler(statusCodeUtility.Success, "User found", User, response);
    } catch (error) {
      next(error);
    }
  }

  async addUser(request, response, next) {
    try {
      if (!request.body) {
        return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
      }
      
      const { firstName, lastName, email, contactNumber, dateOfBirth, 
             profilePicture, role, enrollmentNumber, department, 
             passoutYear, semester } = request.body;
      
      if (!firstName || !lastName || !email || !contactNumber || !dateOfBirth || 
          !enrollmentNumber || !department || !passoutYear || !semester) {
        return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
      }
      
      const data = {
        firstName,
        lastName,
        email,
        contactNumber,
        dateOfBirth,
        profilePicture,
        role,
        enrollmentNumber,
        department,
        passoutYear,
        semester
      };
      
      const newUser = await userServices.createUser(data);
      
      if (!newUser) {
        return next(new APIError(statusCodeUtility.InternalServerError, "User not added"));
      }
      
      return ResponseHandler(statusCodeUtility.Created, "User added", newUser, response);
    } catch (error) {
      next(error);
    }
  }

  async editUser(request, response, next) {
    try {
      if (!request.body) {
        return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
      }
      
      const { id } = request.params;
      if (!id) {
        return next(new APIError(statusCodeUtility.BadRequest, "User ID is required"));
      }
      
      const validFields = ["firstName", "lastName", "email", "contactNumber", "dateOfBirth",
                         "profilePicture", "role", "enrollmentNumber", "department", 
                         "passoutYear", "semester"];
                         
      const updateData = Object.keys(request.body).reduce((acc, key) => {
        if (validFields.includes(key)) acc[key] = request.body[key];
        return acc;
      }, {});
      
      if (Object.keys(updateData).length === 0) {
        return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
      }
      
      const updatedUser = await userServices.editUser(id, updateData);
      
      if (!updatedUser) {
        return next(new APIError(statusCodeUtility.NotFound, "User not found"));
      }
      
      return ResponseHandler(statusCodeUtility.Success, "User updated", updatedUser, response);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(request, response, next) {
    try {
      const { id } = request.params;
      if (!id) {
        return next(new APIError(statusCodeUtility.BadRequest, "User ID is required"));
      }
      
      const deletedUser = await userServices.deleteUser(id);
      
      if (!deletedUser) {
        return next(new APIError(statusCodeUtility.NotFound, "User not found"));
      }
      
      return ResponseHandler(statusCodeUtility.Success, "User deleted", deletedUser, response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();