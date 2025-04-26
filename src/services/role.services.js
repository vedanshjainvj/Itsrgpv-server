import roleRepository from "../repository/role.repository.js";

class RoleServices {

    async createRole(data) {
        const newRole = await roleRepository.create(data);
        return newRole;
    }
    
    async getAllRoles(page, limit) {
        const getRoles = await roleRepository.getAll(page, limit);
        return getRoles;
    }

    async findRoleById(id) {
        const findData = await roleRepository.getById(id);
        return findData;
    }

    async editRole(id, updateData) {
        const editData = await roleRepository.edit(id, updateData);
        return editData;
    }

    async deleteRole(id) {
        const deleteData = await roleRepository.delete(id);
        return deleteData;
    }
}

export default new RoleServices();