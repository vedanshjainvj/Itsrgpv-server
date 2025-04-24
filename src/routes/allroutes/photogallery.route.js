import express from "express";

const router = express.Router();

router.get("/get-photogallery",asyncHandler(photogalleryController.getPhotogallery));
router.get("/get-photogallery/:id",asyncHandler(photogalleryController.getPhotogalleryById));
router.post("/add-photogallery",asyncHandler(photogalleryController.addPhotogallery));
router.put("/edit-photogallery/:id",asyncHandler(photogalleryController.editPhotogallery));
router.delete("/delete-photogallery/:id",asyncHandler(photogalleryController.deletePhotogallery));

export default router;