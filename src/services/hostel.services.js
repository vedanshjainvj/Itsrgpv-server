import hostelRepository from "../repository/hostel.repository.js";

class HostelServices {

    static async createHostel(data) {
        const newHostel = await hostelRepository.create(data);
        return newHostel;
    }
    
    static async getAllHostels(page, limit) {
        const getHostels = await hostelRepository.getAll(page, limit);
        return getHostels;
    }

    static async findHostelById(id) {
        const findData = await hostelRepository.getById(id);
        return findData;
    }

    static async editHostel(id, updateData) {
        const editData = await hostelRepository.edit(id, updateData);
        return editData;
    }

    static async deleteHostel(id) {
        const deleteData = await hostelRepository.delete(id);
        return deleteData;
    }
}

export default HostelServices;