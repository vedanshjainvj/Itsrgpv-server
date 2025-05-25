import demandModel from "../models/demand.model.js";

class DemandRepository {
    
    // Create demand
    static async create(data) {
        const newDemand = await demandModel.create(data);
        return newDemand;
    }
    
    // Get all demands
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllDemands = await demandModel.find()
       .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
        return getAllDemands;
    }

    // Get single demand
    static async getById(id) {
        const getDemand = await demandModel.findById(id);
        return getDemand;
    }

    // Update demand
    static async edit(id, updateData) {
        const updatedDemand = await demandModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedDemand;
    }

    // Delete demand
    static async delete(id) {
        const deleteDemand = await demandModel.findByIdAndDelete(id);
        return deleteDemand;
    }
}

export default DemandRepository;