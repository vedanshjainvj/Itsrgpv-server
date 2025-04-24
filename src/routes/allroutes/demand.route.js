import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import demandController from "../../controllers/demand.controller.js";

const router = express.Router();

router.get("/get-demand",asyncHandler(demandController.getDemands));
router.get("/get-demand/:id",asyncHandler(demandController.getDemandById));
router.post("/add-demand",asyncHandler(demandController.addDemand));
router.put("/edit-demand/:id",asyncHandler(demandController.editDemand));
router.delete("/delete-demand/:id",asyncHandler(demandController.deleteDemand));

export default router;