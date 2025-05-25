import startupModel from "../models/startup.model.js";

class StartupRepository {
    
    // Create startup
    async create(data) {
        const newStartup = await startupModel.create(data);
        return newStartup;
    }
    
    // Get all startups
    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllStartups = await startupModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        return getAllStartups;
    }

    // Get single startup
    async getById(id) {
        const getStartup = await startupModel.findById(id);
        return getStartup;
    }

    // Update startup
    async edit(id, updateData) {
        const updatedStartup = await startupModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedStartup;
    }

    // Delete startup
    async delete(id) {
        const deleteStartup = await startupModel.findByIdAndDelete(id);
        return deleteStartup;
    }
}

export default new StartupRepository();