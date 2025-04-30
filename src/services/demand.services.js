import demandRepository from "../repository/demand.repository.js";

class DemandServices {

    static async createDemand(data) {
        const newDemand = await demandRepository.create(data);
        return newDemand;
    }
    
    static async getAllDemands(page, limit) {
        const getDemands = await demandRepository.getAll(page, limit);
        return getDemands;
    }

    static async findDemandById(id) {
        const findData = await demandRepository.getById(id);
        return findData;
    }

    static async editDemand(id, updateData) {
        const editData = await demandRepository.edit(id, updateData);
        return editData;
    }

    static async deleteDemand(id) {
        const deleteData = await demandRepository.delete(id);
        return deleteData;
    }
}

export default DemandServices;