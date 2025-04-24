import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import videoController from "../../controllers/video.controller.js";

const router = express.Router();

router.get("/get-video", asyncHandler(videoController.getVideos));
router.get("/get-video/:id", asyncHandler(videoController.getVideoById));
router.post("/add-video", asyncHandler(videoController.addVideo));
router.put("/edit-video/:id", asyncHandler(videoController.editVideo));
router.delete("/delete-video/:id", asyncHandler(videoController.deleteVideo));


export default router;