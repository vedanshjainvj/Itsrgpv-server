import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import bookController from "../../controllers/book.controller.js";
import upload from "../../configuration/cloudinary/multer.config.js";

const router = express.Router();

router.get("/get-book", asyncHandler(bookController.getBook));

router.get("/get-book/:id", asyncHandler(bookController.getBookById));

router.post("/add-book", upload.single('bookImg') , asyncHandler(bookController.addBook));

router.put("/edit-book/:id",upload.single('bookImg'), asyncHandler(bookController.editBook));

router.delete("/delete-book/:id", asyncHandler(bookController.deleteBook));

export default router;