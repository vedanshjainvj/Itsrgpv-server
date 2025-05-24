import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import festController from "../../controllers/fest.controller.js";


const router = express.Router();


router.get("/get-fests", asyncHandler(festController.getFests));
router.post("/add-fest", asyncHandler(festController.addFest));
router.put("/edit-fest/:id", asyncHandler(festController.editFest));
router.get("/get-fest/:id", asyncHandler(festController.getFestById));
router.delete("/delete-fest/:id", asyncHandler(festController.deleteFest));

export default router;  