import scholarshipRepository from "../repository/scholarship.repository.js";

class ScholarshipServices {

    async createScholarship(data) {
        const newScholarship = await scholarshipRepository.create(data);
        return newScholarship;
    }
    
    async getAllScholarships(page, limit) {
        const getScholarships = await scholarshipRepository.getAll(page, limit);
        return getScholarships;
    }

    async findScholarshipById(id) {
        const findData = await scholarshipRepository.getById(id);
        return findData;
    }

    async editScholarship(id, updateData) {
        const editData = await scholarshipRepository.edit(id, updateData);
        return editData;
    }

    async deleteScholarship(id) {
        const deleteData = await scholarshipRepository.delete(id);
        return deleteData;
    }
}

export default new ScholarshipServices();