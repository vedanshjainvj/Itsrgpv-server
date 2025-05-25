import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import eventController from "../../controllers/event.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();
router.get("/get-event", asyncHandler(eventController.getEvents));

router.get("/get-event/:id", asyncHandler(eventController.getEventById));

router.post(
    "/add-event",
    upload.fields([
      { name: "bannerPicture", maxCount: 1 },
      { name: "eventImages", maxCount: 10 },
    ]),
    asyncHandler(eventController.addEvent)
);

router.put("/edit-event/:id",    upload.fields([
      { name: "bannerPicture", maxCount: 1 },
      { name: "eventImages", maxCount: 10 },
    ]), asyncHandler(eventController.editEvent));

router.delete("/delete-event/:id", asyncHandler(eventController.deleteEvent));

export default router;