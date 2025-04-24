import achievementsRepository from "../repository/achievements.repository.js";

class AchivementServices{

    static  async createAchievement(data) {
          const newAchievement = await achievementsRepository.create(data);
          return newAchievement;
    }
    
    static  async getAllAchievement(page,limit) {
          const getAchievements = await achievementsRepository.getAll(page,limit);
          return getAchievements;
    }

    static  async findAchievementById(id) {
          const findData = await achievementsRepository.getById(id);
          return findData;
    }

    static  async editAchievement(id,updateData) {
          const editData = await achievementsRepository.edit(id,updateData);
          return editData;
    }

    static  async deleteAchievement(id) {
          const deleteData = await achievementsRepository.delete(id);
          return deleteData;
    }

}

export default AchivementServices;