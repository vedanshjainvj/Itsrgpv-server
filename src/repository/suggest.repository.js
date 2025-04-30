import suggestModel from "../models/suggest.model.js";

class SuggestRepository {
    
    // Create suggest
    async create(data) {
        const newSuggest = await suggestModel.create(data);
        return newSuggest;
    }
    
    // Get all suggests
    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllSuggests = await suggestModel.find().skip(skip).limit(limit);
        return getAllSuggests;
    }

    // Get single suggest
    async getById(id) {
        const getSuggest = await suggestModel.findById(id);
        return getSuggest;
    }

    // Update suggest
    async edit(id, updateData) {
        const updatedSuggest = await suggestModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedSuggest;
    }

    // Delete suggest
    async delete(id) {
        const deleteSuggest = await suggestModel.findByIdAndDelete(id);
        return deleteSuggest;
    }
}

export default new SuggestRepository();