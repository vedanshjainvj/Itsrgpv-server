import placementRepository from "../repository/placement.repository.js";

class PlacementServices {

    static async createPlacement(data) {
        const newPlacement = await placementRepository.create(data);
        return newPlacement;
    }
    
    static async getAllPlacements(page, limit) {
        const getPlacements = await placementRepository.getAll(page, limit);
        return getPlacements;
    }

    static async findPlacementById(id) {
        const findData = await placementRepository.getById(id);
        return findData;
    }

    static async editPlacement(id, updateData) {
        const editData = await placementRepository.edit(id, updateData);
        return editData;
    }

    static async deletePlacement(id) {
        const deleteData = await placementRepository.delete(id);
        return deleteData;
    }
}

export default PlacementServices;