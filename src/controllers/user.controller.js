import userModel from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class UserController {
  async getUsers(request, response, next) {
    const Users = await userModel.find({});
    if (!Users) {
      return new APIError(statusCodeUtility.NotFound, "No Users found");
    }
    return ResponseHandler(statusCodeUtility.Success, "Users found", Users, response);
  }

  async getUserById(request, response, next) {
    const User = await userModel.findById(request.params.id);
    if (!User) {
      return new APIError(statusCodeUtility.NotFound, "User not found");
    }
    return ResponseHandler(statusCodeUtility.Success, "User found", User, response);
  }

  async addUser(request, response, next) {
    if (!request.body) {
      return new APIError(statusCodeUtility.BadRequest, "No data provided");
    }
    const { firstName, lastName, email, contactNumber, dateOfBirth, profilePicture, role, enrollmentNumber, department, passoutYear, semester } = request.body;
    const newUser = await userModel.create({
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
    })
    if (!newUser) {
      return new APIError(statusCodeUtility.InternalServerError, "User not added");
    }
    return ResponseHandler(statusCodeUtility.Created, "User added", newUser, response);
  }

  async editUser(request, response, next) {
    if (!request.body) {
      return new APIError(statusCodeUtility.BadRequest, "No data provided");
    }
    const { firstName, lastName, email, contactNumber, dateOfBirth, profilePicture, role, enrollmentNumber, department, passoutYear, semester } = request.body;
    const updatedUser = await userModel.findByIdAndUpdate(request.params.id, {
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
    });
    if (!updatedUser) {
      return new APIError(statusCodeUtility.InternalServerError, "User not updated");
    }
    return ResponseHandler(statusCodeUtility.Success, "User updated", updatedUser, response);
  }

  async deleteUser(request, response, next) {
    const User = await userModel.findByIdAndDelete(request.params.id);
    if (!User) {
      return new APIError(statusCodeUtility.NotFound, "User not found");
    }
    return ResponseHandler(statusCodeUtility.Success, "User deleted", User, response);
  }

}
export default new UserController();