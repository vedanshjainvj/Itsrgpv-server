import notesModel from "../models/notes.model.js";

class NotesRepository {
    
    // Create notes
    static async create(data) {
        // Using notesModel since that's what your schema exports
        const newNotes = await notesModel.create(data);
        return newNotes;
    }
    
    // Get all notes
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllNotes = await notesModel.find().skip(skip).limit(limit);
        return getAllNotes;
    }

    // Get single notes
    static async getById(id) {
        const getNotes = await notesModel.findById(id);
        return getNotes;
    }

    // Update notes
    static async edit(id, updateData) {
        const updatedNotes = await notesModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedNotes;
    }

    // Delete notes
    static async delete(id) {
        const deleteNotes = await notesModel.findByIdAndDelete(id);
        return deleteNotes;
    }
}

export default NotesRepository;