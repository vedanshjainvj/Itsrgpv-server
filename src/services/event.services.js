import eventRepository from "../repository/event.repository.js";

class EventServices {

    static async createEvent(data) {
        const newEvent = await eventRepository.create(data);
        return newEvent;
    }
    
    static async getAllEvents(page, limit) {
        const getEvents = await eventRepository.getAll(page, limit);
        return getEvents;
    }

    static async findEventById(id) {
        const findData = await eventRepository.getById(id);
        return findData;
    }

    static async editEvent(id, updateData) {
        const editData = await eventRepository.edit(id, updateData);
        return editData;
    }

    static async deleteEvent(id) {
        const deleteData = await eventRepository.delete(id);
        return deleteData;
    }
}

export default EventServices;