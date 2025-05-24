import express from "express";
import clubController from "../../controllers/club.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-club", asyncHandler(clubController.getClubs));
router.get("/get-club/:id", asyncHandler(clubController.getClubById));

router.post(
    "/add-club",
    upload.fields([
        { name: "logoImg"}, 
        { name: "coverImg" }
    ]),   // Multer middleware to handle file upload
    asyncHandler(clubController.addClub)  // Wrap the controller with asyncHandler
);

router.put("/edit-club/:id", asyncHandler(clubController.editClub));
router.delete("/delete-club/:id", asyncHandler(clubController.deleteClub));

export default router;