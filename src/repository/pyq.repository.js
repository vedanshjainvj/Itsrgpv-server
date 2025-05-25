import pyqModel from "../models/pyq.model.js";

class PyqRepository {
    
    // Create pyq
    static async create(data) {
        const newPyq = await pyqModel.create(data);
        return newPyq;
    }
    
    // Get all pyqs
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllPyqs = await pyqModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        return getAllPyqs;
    }

    // Get single pyq
    static async getById(id) {
        const getPyq = await pyqModel.findById(id);
        return getPyq;
    }

    // Update pyq
    static async edit(id, updateData) {
        const updatedPyq = await pyqModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedPyq;
    }

    // Delete pyq
    static async delete(id) {
        const deletePyq = await pyqModel.findByIdAndDelete(id);
        return deletePyq;
    }
}

export default PyqRepository;