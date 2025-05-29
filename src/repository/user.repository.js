import userModel from "../models/user.model.js";

class UserRepository {
  
  // Create user
  async create(data) {
    const newUser = await userModel.create(data);
    return newUser;
  }
  
    // Get all users
    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllUsers = await userModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        return getAllUsers;
    }

  // Get single user
  async getByUserId(id) {
    const getUser = await userModel.findOne({userId:id});
    return getUser;
  }
  // Get single user
  async getById(id) {
    const getUser = await userModel.findById(id);
    return getUser;
  }

  // Update user
  async edit(id, updateData) {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedUser;
  }

  // Delete user
  async delete(id) {
    const deleteUser = await userModel.findByIdAndDelete(id);
    return deleteUser;
  }
}

export default new UserRepository();