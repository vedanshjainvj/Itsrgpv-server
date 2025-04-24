import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import suggestController from "../../controllers/suggest.controller.js";

const router = express.Router();

router.get("/get-suggest", asyncHandler(suggestController.getSuggests));
router.get("/get-suggest/:id", asyncHandler(suggestController.getSuggestById));
router.post("/add-suggest", asyncHandler(suggestController.addSuggest));
router.put("/edit-suggest/:id", asyncHandler(suggestController.editSuggest));
router.delete("/delete-suggest/:id", asyncHandler(suggestController.deleteSuggest));


export default router;