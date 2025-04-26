import hostelModel from "../models/hostel.model.js";

class HostelRepository {
    
    // Create hostel
    static async create(data) {
        const newHostel = await hostelModel.create(data);
        return newHostel;
    }
    
    // Get all hostels
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllHostels = await hostelModel.find().skip(skip).limit(limit);
        return getAllHostels;
    }

    // Get single hostel
    static async getById(id) {
        const getHostel = await hostelModel.findById(id);
        return getHostel;
    }

    // Update hostel
    static async edit(id, updateData) {
        const updatedHostel = await hostelModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedHostel;
    }

    // Delete hostel
    static async delete(id) {
        const deleteHostel = await hostelModel.findByIdAndDelete(id);
        return deleteHostel;
    }
}

export default HostelRepository;