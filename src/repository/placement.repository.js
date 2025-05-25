import placementModel from "../models/placement.model.js";

class PlacementRepository {
    
    // Create placement
    static async create(data) {
        const newPlacement = await placementModel.create(data);
        return newPlacement;
    }
    
    // Get all placements
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllPlacements = await placementModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        return getAllPlacements;
    }

    // Get single placement
    static async getById(id) {
        const getPlacement = await placementModel.findById(id);
        return getPlacement;
    }

    // Update placement
    static async edit(id, updateData) {
        const updatedPlacement = await placementModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedPlacement;
    }

    // Delete placement
    static async delete(id) {
        const deletePlacement = await placementModel.findByIdAndDelete(id);
        return deletePlacement;
    }
}

export default PlacementRepository;