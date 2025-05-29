import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import PhotogalleryController from '../../controllers/photogallery.controller.js';
import upload from '../../configuration/cloudinary/multer.config.js';

const router = express.Router();

// Route to add a new photogallery entry with multiple images
router.post('/add-photogallery', 
    upload.array('images', 10), // Allow up to 10 images
    asyncHandler(PhotogalleryController.addPhotogallery));

// Route to get all photogallery entries with pagination
router.get('/get-photogalleries', 
    asyncHandler(PhotogalleryController.getPhotogalleries));

// Route to get a specific photogallery by ID
router.get('/get-photogallery/:id', 
    asyncHandler(PhotogalleryController.getPhotogalleryById));

// Route to add more images to an existing photogallery
router.put('/add-images/:id', 
    upload.array('images', 10), 
    asyncHandler(PhotogalleryController.addImages));

// Route to remove specific images from a photogallery
router.put('/remove-images/:id', 
    asyncHandler(PhotogalleryController.removeImages));

// Route to delete an entire photogallery entry and its images
router.delete('/delete-photogallery/:id', 
    asyncHandler(PhotogalleryController.deletePhotogallery));

export default router;
