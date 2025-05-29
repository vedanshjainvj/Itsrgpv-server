import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import achievementsServices from "../services/achievements.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class AchievementsController {

 //add Achievement
 static async addAchievement(request, response, next) {

      if (!request.body) return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
      const { firstName, lastName, email, achievementDate, branch, fieldOfAchievement,
        enrollmentNumber, department, achievementTitle, semester, achievementDescription,
        awards, photos, socialMediaLinks, mentor } = request.body;
      if (!firstName || !lastName || !email  || !enrollmentNumber ||
        !department || !achievementTitle || !semester || !achievementDate) {
        return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
      }

      const mentorList = JSON.parse(request.body.mentor);

      let photoUrl = null;
        if (request.file) {
            photoUrl = request.file.path;
        }

      const data = {
        firstName,
        lastName,
        email,
        achievementDate,
        branch,
        fieldOfAchievement,
        enrollmentNumber,
        department,
        achievementTitle,
        semester : Number(semester),
        achievementDescription,
        awards,
        photos : photoUrl,
        socialMediaLinks,
        mentor: mentorList
      }
      const newAchievement = await achievementsServices.createAchievement(data);
      if (!newAchievement) return next(new APIError(statusCodeUtility.InternalServerError, "Achievement not added"));

      return ResponseHandler(statusCodeUtility.Created, "Achievement added successfully", newAchievement, response);

 }

//get all achivements
 static async getAchievements(request, response, next) {
    const page = parseInt(request.query.page) || 1; 
    const limit = parseInt(request.query.limit) || 9;
    const Achievements = await achievementsServices.getAllAchievement(page,limit);
    if (!Achievements) return new APIError(statusCodeUtility.NotFound, "No Achievements found");
    return ResponseHandler(statusCodeUtility.Success, "Achievements found", Achievements, response);
  }

//get Particular
 static async getAchievementById(request, response, next) {
    if (!request.params) return new APIError(statusCodeUtility.NotFound, "No Achievements found");
    const id = request.params.id;
    const Achievement = await achievementsServices.findAchievementById(id);
    return ResponseHandler(statusCodeUtility.Success, "Achievement found", Achievement, response);
  }

  //edit achivement
 static async editAchievement(request, response, next) {
      if (!request.body) throw new APIError(statusCodeUtility.BadRequest, "No data provided");

      const { id } = request.params;
      if (!id) throw new APIError(statusCodeUtility.BadRequest, "Achievement ID is required");
     const getDataById = await achievementsServices.findAchievementById(id);
     if(!getDataById){
      throw new APIError(statusCodeUtility.NotFound,"Invalid achivement id...")
     }
      const validFields = [
    "firstName", "lastName", "email", "Year", "achievementDate", "branch",
    "fieldOfAchievement", "enrollmentNumber", "department", "achievementTitle", "semester",
    "achievementDescription", "recognitionLevel", "awards", "photos", "socialMediaLinks"
  ];

  const updateData = {};

  for (const key of validFields) {
    if (key in request.body) {
      const newValue = request.body[key];
      const oldValue = getDataById[key];

      if (newValue !== undefined && newValue != oldValue) {
        updateData[key] = newValue;
      }
    } 
  }

  if (request.file && request.file.path) {
        let photoUrl = null;
        if (request.file) {
            updateData.photos = request.file.path;
        }
  }

  if (Object.keys(updateData).length === 0) {
    return next(new APIError(statusCodeUtility.BadRequest, "No valid changes found"));
  }
      
      const updatedAchievement = await  achievementsServices.editAchievement(id,updateData);
     
      if (!updatedAchievement)  throw new APIError(statusCodeUtility.NotFound, "Achievement not found");

      if (request.file && request.file.filename && getDataById.photos) {
       const url = getDataById.photos;
       await deleteSingleFile(url);
      }
      return ResponseHandler(statusCodeUtility.Success, "Achievement updated successfully", updatedAchievement, response);

  }

  //delete achievement
 static async deleteAchievement(request, response, next) {
  const { id } = request.params;
  if (!id) throw new APIError(statusCodeUtility.BadRequest, "Achievement ID is required");
       const getDataById = await achievementsServices.findAchievementById(id);
     if(!getDataById){
      throw new APIError(statusCodeUtility.NotFound,"Invalid achivement id...")
     }
    const deleteData = await achievementsServices.deleteAchievement(id);
     if (!deleteData) throw new APIError(statusCodeUtility.NotFound, "Achievement have not delete...");
        if (getDataById.photos) {
       const url = getDataById.photos;
       await deleteSingleFile(url);
      }
    return ResponseHandler(statusCodeUtility.Success, "Achievement deleted", null, response);
  }

}

export default AchievementsController;
