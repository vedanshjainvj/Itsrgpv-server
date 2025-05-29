import photogalleryRepository from "../repository/photogallery.repository.js";

class PhotogalleryServices {

    static async createPhotogallery(data) {
        const newPhotogallery = await photogalleryRepository.create(data);
        return newPhotogallery;
    }
    
    static async getAllPhotogallery(page, limit) {
        const getPhotogalleries = await photogalleryRepository.getAll(page, limit);
        return getPhotogalleries;
    }

    static async findPhotogalleryById(id) {
        const findData = await photogalleryRepository.getById(id);
        return findData;
    }

    static async editPhotogallery(id, updateData) {
        const editData = await photogalleryRepository.edit(id, updateData);
        return editData;
    }

    static async deletePhotogallery(id) {
        const deleteData = await photogalleryRepository.delete(id);
        return deleteData;
    }

    static async addImages(id, images) {
        const updatedData = await photogalleryRepository.addImages(id, images);
        return updatedData;
    }

    static async removeImages(id, imageUrls) {
        const updatedData = await photogalleryRepository.removeImages(id, imageUrls);
        return updatedData;
    }
}

export default PhotogalleryServices;
