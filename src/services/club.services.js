import clubRepository from "../repository/club.repository.js";

class ClubServices {

    static async createClub(data) {
        const newClub = await clubRepository.create(data);
        return newClub;
    }
    
    static async getAllClubs(page, limit) {
        const getClubs = await clubRepository.getAll(page, limit);
        return getClubs;
    }

    static async findClubById(id) {
        const findData = await clubRepository.getById(id);
        return findData;
    }

    static async editClub(id, updateData) {
        const editData = await clubRepository.edit(id, updateData);
        return editData;
    }

    static async deleteClub(id) {
        const deleteData = await clubRepository.delete(id);
        return deleteData;
    }
}

export default ClubServices;