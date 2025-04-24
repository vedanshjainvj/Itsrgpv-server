import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import departmentController from "../../controllers/department.controller.js";

const router = express.Router();

router.get("/get-departments",asyncHandler(departmentController.getDepartments));
router.get("/get-department/:id",asyncHandler(departmentController.getDepartmentById));
router.post("/add-department",asyncHandler(departmentController.addDepartment)); 
router.put("/edit-department/:id",asyncHandler(departmentController.editDepartment));
router.delete("/delete-department/:id",asyncHandler(departmentController.deleteDepartment));

export default router;