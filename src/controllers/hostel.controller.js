import hostelServices from "../services/hostel.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class HostelController {

    static async getHostels(request, response, next) {
        try {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;
            
            const Hostels = await hostelServices.getAllHostels(page, limit);
            if (!Hostels) {
                return next(new APIError(statusCodeUtility.NotFound, "No Hostels found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Hostels found", Hostels, response);
        } catch (error) {
            next(error);
        }
    }

    static async getHostelById(request, response, next) {
        try {
            if (!request.params || !request.params.id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Hostel ID is required"));
            }
            const id = request.params.id;
            const Hostel = await hostelServices.findHostelById(id);
            if (!Hostel) {
                return next(new APIError(statusCodeUtility.NotFound, "Hostel not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Hostel found", Hostel, response);
        } catch (error) {
            next(error);
        }
    }

    static async addHostel(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { hostelName, hostelMessCharges, hostelWardenName, totalStudentsInHostel, 
                    hostelPictures, hostelEvents, HostelFacilities, hostelRating, 
                    hostelWardenContactNumber, roomsInHostel, messRating, hostelFeesPerSemester } = request.body;
            
            if (!hostelName || !hostelMessCharges || !hostelWardenName || 
                !totalStudentsInHostel || !hostelWardenContactNumber || !roomsInHostel) {
                return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
            }
            
            const data = {
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
            };
            
            const newHostel = await hostelServices.createHostel(data);
            if (!newHostel) {
                return next(new APIError(statusCodeUtility.InternalServerError, "Hostel not added"));
            }
            return ResponseHandler(statusCodeUtility.Created, "Hostel added", newHostel, response);
        } catch (error) {
            next(error);
        }
    }

    static async editHostel(request, response, next) {
        try {
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }
            
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Hostel ID is required"));
            }
            
            const validFields = ["hostelName", "hostelMessCharges", "hostelWardenName", 
                                "totalStudentsInHostel", "hostelPictures", "hostelEvents", 
                                "HostelFacilities", "hostelRating", "hostelWardenContactNumber", 
                                "roomsInHostel", "messRating", "hostelFeesPerSemester"];
                               
            const updateData = Object.keys(request.body).reduce((acc, key) => {
                if (validFields.includes(key)) acc[key] = request.body[key];
                return acc;
            }, {});
            
            if (Object.keys(updateData).length === 0) {
                return next(new APIError(statusCodeUtility.BadRequest, "No valid fields to update"));
            }
            
            const updatedHostel = await hostelServices.editHostel(id, updateData);
            
            if (!updatedHostel) {
                return next(new APIError(statusCodeUtility.NotFound, "Hostel not found"));
            }
            
            return ResponseHandler(statusCodeUtility.Success, "Hostel updated", updatedHostel, response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteHostel(request, response, next) {
        try {
            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Hostel ID is required"));
            }
            const deletedHostel = await hostelServices.deleteHostel(id);
            if (!deletedHostel) {
                return next(new APIError(statusCodeUtility.NotFound, "Hostel not found"));
            }
            return ResponseHandler(statusCodeUtility.Success, "Hostel deleted", deletedHostel, response);
        } catch (error) {
            next(error);
        }
    }
}

export default HostelController;