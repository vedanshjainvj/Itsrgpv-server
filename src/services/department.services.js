import departmentRepository from "../repository/department.repository.js";

class DepartmentServices {

    static async createDepartment(data) {
        const newDepartment = await departmentRepository.create(data);
        return newDepartment;
    }
    
    static async getAllDepartments(page, limit) {
        const getDepartments = await departmentRepository.getAll(page, limit);
        return getDepartments;
    }

    static async findDepartmentById(id) {
        const findData = await departmentRepository.getById(id);
        return findData;
    }

    static async editDepartment(id, updateData) {
        const editData = await departmentRepository.edit(id, updateData);
        return editData;
    }

    static async deleteDepartment(id) {
        const deleteData = await departmentRepository.delete(id);
        return deleteData;
    }
}

export default DepartmentServices;