import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import notesController from "../../controllers/notes.controller.js";


const router = express.Router();

router.get("/get-notes", asyncHandler(notesController.getNotes));
router.get("/get-note/:id", asyncHandler(notesController.getNotesById));
router.post("/add-note", asyncHandler(notesController.addNotes));
router.put("/edit-notes/:id", asyncHandler(notesController.editNotes));
router.delete("/delete-notes/:id", asyncHandler(notesController.deleteNotes));

export default router;  
