import scholarshipModel from "../models/scholarship.model.js";

class ScholarshipRepository {
    
    // Create scholarship
    async create(data) {
        const newScholarship = await scholarshipModel.create(data);
        return newScholarship;
    }
    
    // Get all scholarships
    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllScholarships = await scholarshipModel.find().skip(skip).limit(limit);
        return getAllScholarships;
    }

    // Get single scholarship
    async getById(id) {
        const getScholarship = await scholarshipModel.findById(id);
        return getScholarship;
    }

    // Update scholarship
    async edit(id, updateData) {
        const updatedScholarship = await scholarshipModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedScholarship;
    }

    // Delete scholarship
    async delete(id) {
        const deleteScholarship = await scholarshipModel.findByIdAndDelete(id);
        return deleteScholarship;
    }
}

export default new ScholarshipRepository();