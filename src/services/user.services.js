import userRepository from "../repository/user.repository.js";

class UserServices {

  async createUser(data) {
    const newUser = await userRepository.create(data);
    return newUser;
  }
  
async getAllUsers(page, limit) {
    const getUsers = await userRepository.getAll(page, limit);
    return getUsers;
}

  async findUserByUserId(id) {
    const findData = await userRepository.getByUserId(id);
    return findData;
  }

  async findUserById(id) {
    const findData = await userRepository.getById(id);
    return findData;
  }

  async editUser(id, updateData) {
    const editData = await userRepository.edit(id, updateData);
    return editData;
  }

  async deleteUser(id) {
    const deleteData = await userRepository.delete(id);
    return deleteData;
  }
}

export default new UserServices();