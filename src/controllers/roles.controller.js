import roleModel from "../models/role.model.js"
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";



class RoleController {

    async addRole(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.NotFound, "No body will not fount");
        }
        const {data} = request.body;
        const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
        if(decodedData.secretKey != process.env.SecretPin){
            return new APIError(statusCodeUtility.Conflict, "Enter correct pin");
        }
        const date = new Date();
         await roleModel.create({roleName:decodedData.roleName,createdDate:date})
        return ResponseHandler(statusCodeUtility.Success, "BOOK found", null, response);
    }

    async getAllRole(request, response, next) {
        if (!request.params) {
            return new APIError(statusCodeUtility.NotFound, "No Book found");
        }
        const Book = await bookModel.findById({ _id: request.params._id });
        return ResponseHandler(statusCodeUtility.Success, "Book found", Book, response);
    }

    async editRole(request, response, next) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }

        const { id } = request.params;
        const { author, description, department, semester, tags, thumbnailPicture, bookUrl, availability, publicationYear } = request.body;
        const editedBook = await bookModel.findByIdAndUpdate({ _id: id }, {
            author,
            description,
            department,
            semester,
            tags,
            thumbnailPicture,
            bookUrl,
            availability,
            publicationYear
        }, { new: true });
        if (!editedBook) {
            return new APIError(statusCodeUtility.InternalServerError, "Book not edited");
        }
        return ResponseHandler(statusCodeUtility.Success, "Book edited", editedBook, response);
    }

    async deleteRole(request, response, next) {
        const { id } = request.params;
        const deletedBook = await bookModel.findByIdAndDelete({ _id: id });
        if (!deletedBook) {
            return new APIError(statusCodeUtility.NotFound, "Book not found");
        }
        return ResponseHandler(statusCodeUtility.Success, "Book deleted", deletedBook, response);
    }
}

export default new RoleController();