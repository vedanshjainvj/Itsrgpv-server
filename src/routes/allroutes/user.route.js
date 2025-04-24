import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import userController from "../../controllers/user.controller.js";

const router = express.Router();

router.get("/get-user", asyncHandler(userController.getUsers));
router.get("/get-user/:id", asyncHandler(userController.getUserById));
router.post("/add-user", asyncHandler(userController.addUser));
router.put("/edit-user/:id", asyncHandler(userController.editUser));
router.delete("/delete-user/:id", asyncHandler(userController.deleteUser));

export default router;