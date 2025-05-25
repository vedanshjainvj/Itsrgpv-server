import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import placementController from "../../controllers/placement.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();
router.get("/get-placement", asyncHandler(placementController.getPlacements));

router.get("/get-placement/:id", asyncHandler(placementController.getPlacementById));

router.post("/add-placement", 
    upload.single("profilePicture"),
    asyncHandler(placementController.addPlacement));

router.put("/edit-placement/:id",    upload.single("profilePicture"),
 asyncHandler(placementController.editPlacement));

router.delete("/delete-placement/:id", asyncHandler(placementController.deletePlacement));

export default router;