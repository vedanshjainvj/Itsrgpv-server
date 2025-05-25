import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import hostelServices from "../services/hostel.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class HostelController {

    static async getHostels(request, response, next) {
            const page = parseInt(request.query.page) || 1;
            const limit = parseInt(request.query.limit) || 10;

            const Hostels = await hostelServices.getAllHostels(page, limit);
            if (!Hostels) {
                throw new APIError(statusCodeUtility.NotFound, "No Hostels found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Hostels found", Hostels, response);
    }

    static async getHostelById(request, response, next) {
            if (!request.params || !request.params.id) {
               throw new APIError(statusCodeUtility.BadRequest, "Hostel ID is required");
            }
            const id = request.params.id;
            const Hostel = await hostelServices.findHostelById(id);
            if (!Hostel) {
                throw new APIError(statusCodeUtility.NotFound, "Hostel not found");
            }
            return ResponseHandler(statusCodeUtility.Success, "Hostel found", Hostel, response);
    }

    static async addHostel(request, response, next) {
     
            if (!request.body) {
               throw new APIError(statusCodeUtility.BadRequest, "No data provided");
            }

            const { hostelName, hostelMessCharges, hostelWardenName, totalStudentsInHostel,hostelEvents, HostelFacilities, hostelRating,
                hostelWardenContactNumber, roomsInHostel, messRating, hostelFeesPerSemester } = request.body;


            if (!hostelName || !hostelMessCharges || !hostelWardenName ||
                !totalStudentsInHostel || !hostelWardenContactNumber) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }

            const contactNumbers = Array.isArray(hostelWardenContactNumber)
                ? request.body.hostelWardenContactNumber
                : request.body.hostelWardenContactNumber.split(',').map((num) => num.trim());

            const images = request.files.map((file) => file.path);

            const data = {
                hostelName,
                hostelMessCharges,
                hostelWardenName,
                totalStudentsInHostel,
                hostelPictures: images,
                hostelEvents,
                HostelFacilities,
                hostelRating,
                hostelWardenContactNumber: contactNumbers,
                roomsInHostel,
                messRating,
                hostelFeesPerSemester
            };

            const newHostel = await hostelServices.createHostel(data);
            if (!newHostel) {
              throw new APIError(statusCodeUtility.InternalServerError, "Hostel not added");
            }
            return ResponseHandler(statusCodeUtility.Created, "Hostel added", newHostel, response);
    }

    static async editHostel(request, response, next) {
     
            if (!request.body) {
                return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
            }

            const { id } = request.params;
            if (!id) {
                return next(new APIError(statusCodeUtility.BadRequest, "Hostel ID is required"));
            }
                const getDataById = await hostelServices.findHostelById(id)
                    if (!getDataById) {
                        throw new APIError(statusCodeUtility.NotFound, "Invalid hostel id...")
                    }
            const validFields = ["hostelName", "hostelMessCharges", "hostelWardenName",
                "totalStudentsInHostel", "hostelPictures", "hostelEvents",
                "HostelFacilities", "hostelRating", "hostelWardenContactNumber",
                "roomsInHostel", "messRating", "hostelFeesPerSemester"];

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

         if (request.files) {
             if (request.files) {
                 const existingImages = getDataById.hostelPictures || [];
                 const newImagePaths =  request.files.map((file) => file.path);
                 updateData.hostelPictures = [...existingImages, ...newImagePaths];
                }
            }

            if (Object.keys(updateData).length === 0) {
                throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
            }

            const updatedHostel = await hostelServices.editHostel(id, updateData);

            if (!updatedHostel) {
               throw new APIError(statusCodeUtility.NotFound, "Hostel not found");
            }

            return ResponseHandler(statusCodeUtility.Success, "Hostel updated", updatedHostel, response);
    }

    static async deleteHostel(request, response, next) {
            const { id } = request.params;
            if (!id) {
               throw new APIError(statusCodeUtility.BadRequest, "Hostel ID is required");
            }
                    const getDataById = await hostelServices.findHostelById(id)
                    if (!getDataById) {
                        throw new APIError(statusCodeUtility.NotFound, "Invalid hostel id...")
                    }
            const deletedHostel = await hostelServices.deleteHostel(id);
            if (!deletedHostel) {
                throw new APIError(statusCodeUtility.NotFound, "Hostel not found");
            }
       if (getDataById.hostelPictures && getDataById.hostelPictures.length > 0) {
    for (const url of getDataById.hostelPictures) {
        await deleteSingleFile(url);
    }
}

            return ResponseHandler(statusCodeUtility.Success, "Hostel deleted", deletedHostel, response);
     
    }
}

export default HostelController;