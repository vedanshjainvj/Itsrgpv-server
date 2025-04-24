import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import eventController from "../../controllers/event.controller.js";

const router = express.Router();
router.get("/get-event", asyncHandler(eventController.getEvents));
router.get("/get-event/:id", asyncHandler(eventController.getEventById));
router.post("/add-event", asyncHandler(eventController.addEvent));
router.put("/edit-event/:id", asyncHandler(eventController.editEvent));
router.delete("/delete-event/:id", asyncHandler(eventController.deleteEvent));

export default router;