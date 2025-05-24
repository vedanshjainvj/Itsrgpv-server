import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import notesController from "../../controllers/notes.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";


const router = express.Router();

router.get("/get-notes", asyncHandler(notesController.getNotes));

router.get("/get-notes/:id", asyncHandler(notesController.getNotesById));

router.post("/add-notes",
    upload.fields([
        { name: "thumbnailPicture", maxCount: 1 },  // Single thumbnail image
        { name: "notesFile", maxCount: 1 }           // Single notes file (PDF/Doc)
    ]),
    asyncHandler(notesController.addNotes)
);
router.put("/edit-notes/:id", asyncHandler(notesController.editNotes));

router.delete("/delete-notes/:id", asyncHandler(notesController.deleteNotes));

export default router;  
