import festModel from "../models/fest.model.js";

class FestRepository {
    
    // Create fest
    static async create(data) {
        const newFest = await festModel.create(data);
        return newFest;
    }
    
    // Get all fests
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllFests = await festModel.find().skip(skip).limit(limit);
        return getAllFests;
    }

    // Get single fest
    static async getById(id) {
        const getFest = await festModel.findById(id);
        return getFest;
    }

    // Update fest
    static async edit(id, updateData) {
        const updatedFest = await festModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedFest;
    }

    // Delete fest
    static async delete(id) {
        const deleteFest = await festModel.findByIdAndDelete(id);
        return deleteFest;
    }
}

export default FestRepository;