import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import departmentController from "../../controllers/department.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-department",asyncHandler(departmentController.getDepartments));

router.get("/get-department/:id",asyncHandler(departmentController.getDepartmentById));

router.post("/add-department",
    upload.array("departmentImages", 10),
    asyncHandler(departmentController.addDepartment)); 

router.put("/edit-department/:id", upload.array("departmentImages", 10),asyncHandler(departmentController.editDepartment));

router.delete("/delete-department/:id",asyncHandler(departmentController.deleteDepartment));

export default router;