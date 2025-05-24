import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import pyqController from "../../controllers/pyq.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-pyq", asyncHandler(pyqController.getPyqs));

router.get("/get-pyq/:id", asyncHandler(pyqController.getPyqById));

router.post("/add-pyq",
    upload.single("questionPaperImg"),
    asyncHandler(pyqController.addPyq));

router.put("/edit-pyq/:id", asyncHandler(pyqController.editPyq));

router.delete("/delete-pyq/:id", asyncHandler(pyqController.deletePyq));

export default router;