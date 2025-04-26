import roleModel from "../models/role.model.js";

class RoleRepository {
    
    // Create role
    async create(data) {
        const newRole = await roleModel.create(data);
        return newRole;
    }
    
    // Get all roles
    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllRoles = await roleModel.find().skip(skip).limit(limit);
        return getAllRoles;
    }

    // Get single role
    async getById(id) {
        const getRole = await roleModel.findById(id);
        return getRole;
    }

    // Update role
    async edit(id, updateData) {
        const updatedRole = await roleModel.findByIdAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );
        return updatedRole;
    }

    // Delete role
    async delete(id) {
        const deleteRole = await roleModel.findByIdAndDelete({ _id: id });
        return deleteRole;
    }
}

export default new RoleRepository();