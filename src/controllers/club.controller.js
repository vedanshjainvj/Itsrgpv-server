import clubModel from "../models/club.model.js"
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";


class ClubController {

    async getClubs(request, response, next){
        const Clubs = await clubModel.find({});
        if(!Clubs){
            return new APIError(statusCodeUtility.NotFound, "No Clubs found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Clubs found", Clubs, response);
    }

    async getClubById(request, response, next){
        if(!request.params){
            return new APIError(statusCodeUtility.NotFound, "No Clubs found");
        }
        const Club = await clubModel.findById({_id: request.params._id});
        return ResponseHandler(statusCodeUtility.Success, "Club found", Club, response);
    }
    

    
    async addClub(request, response, next){
        if(!request.body){
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
       const {clubName, founderName, description, typeOfClub, dateOfeshtablishment, contactEmail, contactPhone, socialLinks, logoCoverImg} = request.body;
       
       const newClub = await clubModel.create({
              clubName,
              founderName,
              description,
              typeOfClub,
              dateOfeshtablishment,
              contactEmail,
              contactPhone,
              socialLinks,
              logoCoverImg
       });

         if(!newClub){
              return new APIError(statusCodeUtility.InternalServerError, "Club not added");
         }
            return ResponseHandler(statusCodeUtility.Created, "Club added", newClub, response);
    }


    async editClub(request, response, next){
        if(!request.body){
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const {clubName, founderName, description, typeOfClub, dateOfeshtablishment, contactEmail, contactPhone, socialLinks, logoCoverImg} = request.body;
        const _id = request.params.id;
        const updatedClub = await clubModel.findByIdAndUpdate(_id, {
            clubName,
            founderName,
            description,
            typeOfClub,
            dateOfeshtablishment,
            contactEmail,
            contactPhone,
            socialLinks,
            logoCoverImg
        }, {new: true});

        if(!updatedClub){
            return new APIError(statusCodeUtility.InternalServerError, "Club not updated");
        }
        return ResponseHandler(statusCodeUtility.Success, "Club updated", updatedClub, response);
    }


    async deleteClub(request, response, next){
        const _id = request.params.id;
        const deletedClub = await clubModel.findByIdAndDelete(_id);
        if(!deletedClub){
            return new APIError(statusCodeUtility.InternalServerError, "Club not deleted");
        }
        return ResponseHandler(statusCodeUtility.Success, "Club deleted", deletedClub, response);
    }
}
export default new ClubController();