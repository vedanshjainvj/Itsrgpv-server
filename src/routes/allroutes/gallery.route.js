import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import GalleryController from "../../controllers/gallery.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-gallery", asyncHandler(GalleryController.getGallery));
router.get("/get-gallery/:id", asyncHandler(GalleryController.getGalleryById));

router.post("/add-gallery",
    upload.array("images", 10),
     asyncHandler(GalleryController.addGallery));

router.put("/edit-gallery/:id",upload.array("images", 10), asyncHandler(GalleryController.editGallery));
router.delete("delete-galleryImage/:id", asyncHandler(GalleryController.deleteGallery));

export default router;