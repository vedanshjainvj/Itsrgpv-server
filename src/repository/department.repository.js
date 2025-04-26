import departmentModel from "../models/department.model.js";

class DepartmentRepository {
    
    // Create department
    static async create(data) {
        const newDepartment = await departmentModel.create(data);
        return newDepartment;
    }
    
    // Get all departments
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllDepartments = await departmentModel.find().skip(skip).limit(limit);
        return getAllDepartments;
    }

    // Get single department
    static async getById(id) {
        const getDepartment = await departmentModel.findById(id);
        return getDepartment;
    }

    // Update department
    static async edit(id, updateData) {
        const updatedDepartment = await departmentModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedDepartment;
    }

    // Delete department
    static async delete(id) {
        const deleteDepartment = await departmentModel.findByIdAndDelete(id);
        return deleteDepartment;
    }
}

export default DepartmentRepository;