import photogalleryModel from "../models/photogallery.model.js";

class PhotogalleryRepository {
    
    // Create a new photogallery entry
    static async create(data) {
        const newPhotogallery = await photogalleryModel.create(data);
        return newPhotogallery;
    }

    // Get all photogallery entries with pagination
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const getAllPhotogalleries = await photogalleryModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return getAllPhotogalleries;
    }

    // Get a single photogallery entry by ID
    static async getById(id) {
        const getdata = await photogalleryModel.findById(id);
        return getdata;
    }

    // Update a photogallery entry
    static async edit(id, updateData) {
        const updatedPhotogallery = await photogalleryModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedPhotogallery;
    }

    // Delete a photogallery entry
    static async delete(id) {
        const deletePhotogallery = await photogalleryModel.findByIdAndDelete(id);
        return deletePhotogallery;
    }

    // Add images to an existing photogallery entry
    static async addImages(id, images) {
        const updatedPhotogallery = await photogalleryModel.findByIdAndUpdate(
            id,
            { $push: { images: { $each: images } } },
            { new: true, runValidators: true }
        );
        return updatedPhotogallery;
    }

    // Remove specific images from a photogallery entry
    static async removeImages(id, imageUrls) {
        const updatedPhotogallery = await photogalleryModel.findByIdAndUpdate(
            id,
            { $pull: { images: { $in: imageUrls } } },
            { new: true }
        );
        return updatedPhotogallery;
    }
}

export default PhotogalleryRepository;
