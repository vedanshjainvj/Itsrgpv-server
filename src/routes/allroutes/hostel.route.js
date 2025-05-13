import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import hostelController from "../../controllers/hostel.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-hostel", asyncHandler(hostelController.getHostels));
router.get("/get-hostel/:id", asyncHandler(hostelController.getHostelById));

router.post("/add-hostel",
    upload.array("hostelPictures", 10),
     asyncHandler(hostelController.addHostel));

router.put("/edit-hostel/:id", asyncHandler(hostelController.editHostel));
router.delete("/delete-hostel/:id", asyncHandler(hostelController.deleteHostel));

export default router;