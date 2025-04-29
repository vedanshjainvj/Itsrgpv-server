import festRepository from "../repository/fest.repository.js";

class FestServices {

    static async createFest(data) {
        const newFest = await festRepository.create(data);
        return newFest;
    }
    
    static async getAllFests(page, limit) {
        const getFests = await festRepository.getAll(page, limit);
        return getFests;
    }

    static async findFestById(id) {
        const findData = await festRepository.getById(id);
        return findData;
    }

    static async editFest(id, updateData) {
        const editData = await festRepository.edit(id, updateData);
        return editData;
    }

    static async deleteFest(id) {
        const deleteData = await festRepository.delete(id);
        return deleteData;
    }
}

export default FestServices;