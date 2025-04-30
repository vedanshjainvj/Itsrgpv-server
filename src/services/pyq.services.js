import pyqRepository from "../repository/pyq.repository.js";

class PyqServices {

    static async createPyq(data) {
        const newPyq = await pyqRepository.create(data);
        return newPyq;
    }
    
    static async getAllPyqs(page, limit) {
        const getPyqs = await pyqRepository.getAll(page, limit);
        return getPyqs;
    }

    static async findPyqById(id) {
        const findData = await pyqRepository.getById(id);
        return findData;
    }

    static async editPyq(id, updateData) {
        const editData = await pyqRepository.edit(id, updateData);
        return editData;
    }

    static async deletePyq(id) {
        const deleteData = await pyqRepository.delete(id);
        return deleteData;
    }
}

export default PyqServices;