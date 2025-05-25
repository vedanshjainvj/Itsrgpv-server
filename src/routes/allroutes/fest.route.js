import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import festController from "../../controllers/fest.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";


const router = express.Router();


router.get("/get-fests", asyncHandler(festController.getFest));

router.post("/add-fest",
    upload.fields([
        { name: "bannerPicture", maxCount: 1 },
        { name: "festImages", maxCount: 10 },
    ]),
    asyncHandler(festController.addFest));

router.put("/edit-fest/:id",    upload.fields([
        { name: "bannerPicture", maxCount: 1 },
        { name: "festImages", maxCount: 10 },
    ]), asyncHandler(festController.editFest));

router.get("/get-fest/:id", asyncHandler(festController.getFestById));

router.delete("/delete-fest/:id", asyncHandler(festController.deleteFest));
    
export default router;  