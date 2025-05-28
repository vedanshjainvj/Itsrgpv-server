import userServices from "../services/user.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class UserController {
  async getUsers(request, response, next) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        
        const Users = await userServices.getAllUsers(page, limit);
        if (!Users) {
         throw new APIError(statusCodeUtility.NotFound, "No Users found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Users found", Users, response);
  }

  async getUserByUserId(request, response, next) {
      const id = request.query.userId;
      console.log(id)
         if (!id) {
         throw new APIError(statusCodeUtility.Conflict, "Users id required found");
        }
      const User = await userServices.findUserByUserId(id);
      console.log(User)
      if (!User) {
        throw new APIError(statusCodeUtility.NotFound, "User not found");
      }
      
      return ResponseHandler(statusCodeUtility.Success, "User found", User, response);
  }
  async getUserById(request, response, next) {
  
      if (!request.params || !request.params.id) {
        throw new APIError(statusCodeUtility.BadRequest, "User ID is required");
      }
      
      const id = request.params.id;
      const User = await userServices.findUserById(id);
      
      if (!User) {
        throw new APIError(statusCodeUtility.NotFound, "User not found");
      }
      
      return ResponseHandler(statusCodeUtility.Success, "User found", User, response);
  }

  async addUser(request, response, next) {
      if (!request.body) {
        throw new APIError(statusCodeUtility.BadRequest, "No data provided");
      }
      
  const {
      firstName,
      lastName,
      userId,
      email,
      contactNumber,
      dob,
      gender,
      profilePic,
      enrollmentNumber,
      branch,
      semester,
      year,
      socialLinks,
      aboutUs,
      skills,
    } = request.body;
      console.log(request.body)
      if (
      !firstName ||
      !lastName ||
      !userId ||
      !email ||
      !contactNumber ||
      !dob ||
      !gender ||
      !enrollmentNumber ||
      !branch ||
      !semester ||
      !year ||
      !aboutUs
    ) {
      throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
    }
      
         const newUserData = {
      firstName,
      lastName,
      userId,
      email,
      contactNumber,
      dob: new Date(dob), // ensure it's a Date
      gender,
      profilePic,
      enrollmentNumber,
      branch,
      semester,
      year,
      socialLinks: {
        instagram: socialLinks?.instagram || '',
        linkedin: socialLinks?.linkedin || '',
        github: socialLinks?.github || '',
        twitter: socialLinks?.twitter || '',
      },
      aboutUs,
      skills: skills || [],
    };

      
      const newUser = await userServices.createUser(newUserData);
      
      if (!newUser) {
        throw new APIError(statusCodeUtility.InternalServerError, "User not added");
      }
      
      return ResponseHandler(statusCodeUtility.Created, "User added", newUser, response);
  }

  async editUser(request, response, next) {
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