import deleteSingleFile from "../configuration/cloudinary/deleteSingleFileByURL.js";
import BookServices from "../services/book.services.js";
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class BookController {


    static async addBook(request, response, next) {
        if (!request.body) {
            throw new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }
        const { title, author, description, department, semester, tags, bookImg, bookUrl, availability, publicationYear } = request.body;

        if (!title || !author || !department || !semester || !description || !availability) {
            return next(new APIError(statusCodeUtility.BadRequest, "Missing required fields"));
        }

        let bookUploadUrl = null;
        if (request.file) {
            bookUploadUrl = request.file.path
        }

        console.log("Uploaded file details:", request.file);

        const data = {
            title,
            author,
            description,
            department,
            semester: parseInt(semester),
            tags,
            bookImg: bookUploadUrl,
            bookUrl,
            availability,
            publicationYear
        }

        const newBook = await BookServices.createBook(data);
        if (!newBook) {
            throw new APIError(statusCodeUtility.InternalServerError, "Book not added");
        }
        return ResponseHandler(statusCodeUtility.Created, "Book added", newBook, response);
    }

    static async getBook(request, response, next) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const Books = await BookServices.getAllBook(page, limit)
        if (!Books) {
            throw new APIError(statusCodeUtility.NotFound, "No Book found");
        }
        return ResponseHandler(statusCodeUtility.Success, "BOOK found", Books, response);
    }

    static async getBookById(request, response, next) {
        if (!request.params) {
            throw new APIError(statusCodeUtility.NotFound, "No Book found");
        }
        const id = request.params.id;
        const Book = await BookServices.findBookById(id);
        return ResponseHandler(statusCodeUtility.Success, "Book found", Book, response);
    }



    static async editBook(request, response, next) {
        if (!request.body) {
            throw new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }

        const { id } = request.params;
        if (!id) {
            throw new APIError(statusCodeUtility.BadRequest, "Book ID is required");
        }
        const getDataById = await BookServices.findBookById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid book id...")
        }

        const validFields = ["author", "description", "department", "semester",
            "tags", "thumbnailPicture", "bookUrl", "availability",
            "publicationYear"];

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

        if (request.file) {
            updateData.thumbnailPicture = request.file.path;
        }
        if (Object.keys(updateData).length === 0) {
            throw new APIError(statusCodeUtility.BadRequest, "No valid fields to update");
        }

        const editedBook = await BookServices.editBook(id, updateData);
        if (!editedBook) {
            throw new APIError(statusCodeUtility.InternalServerError, "Book not edited");
        }
        if (request.file && getDataById.thumbnailPicture) {
            await deleteSingleFile(getDataById.thumbnailPicture);
        }
        return ResponseHandler(statusCodeUtility.Success, "Book edited", editedBook, response);
    }

    static async deleteBook(request, response, next) {
        const { id } = request.params;
        if (!id) {
            throw new APIError(statusCodeUtility.BadRequest, "Book ID is required");
        }
        const getDataById = await BookServices.findBookById(id);
        if (!getDataById) {
            throw new APIError(statusCodeUtility.NotFound, "Invalid book id...")
        }
        const deletedBook = await BookServices.deleteBook(id);
        if (!deletedBook) {
            throw new APIError(statusCodeUtility.NotFound, "Book not found");
        }
        if (getDataById.thumbnailPicture) {
            await deleteSingleFile(getDataById.thumbnailPicture);
        }
        return ResponseHandler(statusCodeUtility.Success, "Book deleted", deletedBook, response);
    }
}

export default BookController;