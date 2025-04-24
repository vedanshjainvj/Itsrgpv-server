import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import scholarshipController from "../../controllers/scholarship.controller.js";


const router = express.Router();

router.get("/get-scholarship", asyncHandler(scholarshipController.getScholarships));
router.get("/get-scholarship/:id", asyncHandler(scholarshipController.getScholarshipById));
router.post("/add-scholarship", asyncHandler(scholarshipController.addScholarship));
router.put("/edit-scholarship/:id", asyncHandler(scholarshipController.editScholarship));
router.delete("/delete-scholarship/:id", asyncHandler(scholarshipController.deleteScholarship));

export default router;