import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import placementController from "../../controllers/placement.controller.js";

const router = express.Router();
router.get("/get-placement", asyncHandler(placementController.getPlacements));
router.get("/get-placement/:id", asyncHandler(placementController.getPlacementById));
router.post("/add-placement", asyncHandler(placementController.addPlacement));
router.put("/edit-placement/:id", asyncHandler(placementController.editPlacement));
router.delete("/delete-placement/:id", asyncHandler(placementController.deletePlacement));

export default router;