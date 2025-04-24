import express from "express";
import clubController from "../../controllers/club.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = express.Router();

router.get("/get-club", asyncHandler(clubController.getClubs));
router.get("/get-club/:id", asyncHandler(clubController.getClubById));
router.post("/add-club", asyncHandler(clubController.addClub));
router.put("/edit-club/:id", asyncHandler(clubController.editClub));
router.delete("/delete-club/:id", asyncHandler(clubController.deleteClub));

export default router;