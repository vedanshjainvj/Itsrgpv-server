import hostelModel from "../models/hostel.model.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class HostelController {
    async getHostels(request, response, next) {
        const Hostels = await hostelModel.find({});
        if (!Hostels) {
            return new APIError(statusCodeUtility.NotFound, "No Hostels found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Hostels found", Hostels, response);
    }

    async getHostelById(request, response, next) {
        const Hostel = await hostelModel.findById(request.params.id);
        if (!Hostel) {
            return new APIError(statusCodeUtility.NotFound, "Hostel not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Hostel found", Hostel, response);
    }

    async addHostel(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data provided");
        }
        const { hostelName, hostelMessCharges, hostelWardenName, totalStudentsInHostel, hostelPictures, hostelEvents, HostelFacilities, hostelRating, hostelWardenContactNumber, roomsInHostel, messRating, hostelFeesPerSemester } = request.body;

        const newHostel = await hostelModel.create({
            hostelName,
            hostelMessCharges,
            hostelWardenName,
            totalStudentsInHostel,
            hostelPictures,
            hostelEvents,
            HostelFacilities,
            hostelRating,
            hostelWardenContactNumber,
            roomsInHostel,
            messRating,
            hostelFeesPerSemester
        });

        if (!newHostel) {
            return new APIError(statusCodeUtility.InternalServerError, "Hostel not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Hostel added", newHostel, response);
    }


    async


}
export default new HostelController();