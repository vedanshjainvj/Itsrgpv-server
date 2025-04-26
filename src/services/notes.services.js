import notesRepository from "../repository/notes.repository.js";

class NotesServices {

    static async createNotes(data) {
        const newNotes = await notesRepository.create(data);
        return newNotes;
    }
    
    static async getAllNotes(page, limit) {
        const getNotes = await notesRepository.getAll(page, limit);
        return getNotes;
    }

    static async findNotesById(id) {
        const findData = await notesRepository.getById(id);
        return findData;
    }

    static async editNotes(id, updateData) {
        const editData = await notesRepository.edit(id, updateData);
        return editData;
    }

    static async deleteNotes(id) {
        const deleteData = await notesRepository.delete(id);
        return deleteData;
    }
}

export default NotesServices;