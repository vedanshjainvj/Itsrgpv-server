import achievementModel from "../models/achievement.model.js";

class AchievementRepository{
    
    //to create achievement
    static  async create(data) {
          const newAchievement = await achievementModel.create(data);
           return newAchievement;
     }
     //get all achievement
    static  async getAll(page,limit) {
        const skip = (page-1)* limit;
          const getAllAchievement = await achievementModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
           return getAllAchievement;
     }

     //get single achievement
    static  async getById(id) {
          const getdata = await achievementModel.findById(id);
           return getdata;
     }

     //update achievement
    static  async edit(id,updateData) {
               const updatedAchievement = await achievementModel.findByIdAndUpdate(
                 id,
                 { $set: updateData },
                 { new: true, runValidators: true }
               );
           return updatedAchievement;
     }

     //delete achievement
    static  async delete(id) {
      console.log(id, "this")
         const deleteAchievement = await achievementModel.findByIdAndDelete(id);
           return deleteAchievement;
     }

}

export default  AchievementRepository;