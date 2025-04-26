import clubModel from "../models/club.model.js";

class ClubRepository {
    
    // Create club
    static async create(data) {
        const newClub = await clubModel.create(data);
        return newClub;
    }
    
    // Get all clubs
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllClubs = await clubModel.find().skip(skip).limit(limit);
        return getAllClubs;
    }

    // Get single club
    static async getById(id) {
        const getClub = await clubModel.findById(id);
        return getClub;
    }

    // Update club
    static async edit(id, updateData) {
        const updatedClub = await clubModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedClub;
    }

    // Delete club
    static async delete(id) {
        const deleteClub = await clubModel.findByIdAndDelete(id);
        return deleteClub;
    }
}

export default ClubRepository;