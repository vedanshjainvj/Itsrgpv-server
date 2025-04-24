import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import rolesController from "../../controllers/roles.controller.js";

const router = express.Router();
router.post("/add-roles", asyncHandler(rolesController.addRole));

export default router;