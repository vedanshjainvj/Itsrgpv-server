import startupRepository from "../repository/startup.repository.js";

class StartupServices {

    async createStartup(data) {
        const newStartup = await startupRepository.create(data);
        return newStartup;
    }
    
    async getAllStartups(page, limit) {
        const getStartups = await startupRepository.getAll(page, limit);
        return getStartups;
    }

    async findStartupById(id) {
        const findData = await startupRepository.getById(id);
        return findData;
    }

    async editStartup(id, updateData) {
        const editData = await startupRepository.edit(id, updateData);
        return editData;
    }

    async deleteStartup(id) {
        const deleteData = await startupRepository.delete(id);
        return deleteData;
    }
}

export default new StartupServices();