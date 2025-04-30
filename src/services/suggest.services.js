import suggestRepository from "../repository/suggest.repository.js";

class SuggestServices {

    async createSuggest(data) {
        const newSuggest = await suggestRepository.create(data);
        return newSuggest;
    }
    
    async getAllSuggests(page, limit) {
        const getSuggests = await suggestRepository.getAll(page, limit);
        return getSuggests;
    }

    async findSuggestById(id) {
        const findData = await suggestRepository.getById(id);
        return findData;
    }

    async editSuggest(id, updateData) {
        const editData = await suggestRepository.edit(id, updateData);
        return editData;
    }

    async deleteSuggest(id) {
        const deleteData = await suggestRepository.delete(id);
        return deleteData;
    }
}

export default new SuggestServices();