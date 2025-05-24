import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import achievementsController from '../../controllers/achievements.controller.js';
import upload from '../../configuration/cloudinary/multer.config.js';

const router = express.Router();

router.post('/add-achievement',
    upload.single("photos"),
    asyncHandler(achievementsController.addAchievement));

router.get('/get-achievements', asyncHandler(achievementsController.getAchievements));

router.get('/get-achievement/:id',asyncHandler(achievementsController.getAchievementById));

router.put('/edit-achievement/:id',upload.single("photos"),asyncHandler(achievementsController.editAchievement));

router.delete('/delete-achievement/:id',asyncHandler(achievementsController.deleteAchievement));

export default router;