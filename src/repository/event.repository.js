import eventModel from "../models/event.model.js";

class EventRepository {
    
    // Create event
    static async create(data) {
        const newEvent = await eventModel.create(data);
        return newEvent;
    }
    
    // Get all events
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllEvents = await eventModel.find().skip(skip).limit(limit);
        return getAllEvents;
    }

    // Get single event
    static async getById(id) {
        const getEvent = await eventModel.findById(id);
        return getEvent;
    }

    // Update event
    static async edit(id, updateData) {
        const updatedEvent = await eventModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedEvent;
    }

    // Delete event
    static async delete(id) {
        const deleteEvent = await eventModel.findByIdAndDelete(id);
        return deleteEvent;
    }
}

export default EventRepository;