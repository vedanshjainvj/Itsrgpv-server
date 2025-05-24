import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import startupController from "../../controllers/startup.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";


const router = express.Router();

router.get("/get-startup", asyncHandler(startupController.getStartups));

router.get("/get-startup/:id", asyncHandler(startupController.getStartupById));

router.post("/add-startup",upload.single('startupLogo'), asyncHandler(startupController.addStartup));

router.put("/edit-startup/:id", asyncHandler(startupController.editStartup));

router.delete("/delete-startup/:id", asyncHandler(startupController.deleteStartup));



export default router;