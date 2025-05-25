import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import DemandController from "../../controllers/demand.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-demand",asyncHandler(DemandController.getDemands));

router.get("/get-demand/:id",asyncHandler(DemandController.getDemandById));

router.post("/add-demand",
    upload.fields([{ name: "supportAttachment", maxCount: 5 }]),
    asyncHandler(DemandController.addDemand));

router.put("/edit-demand/:id", upload.fields([{ name: "supportAttachment", maxCount: 5 }]),asyncHandler(DemandController.editDemand));

router.delete("/delete-demand/:id",asyncHandler(DemandController.deleteDemand));

export default router;