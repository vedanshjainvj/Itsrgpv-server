import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    author: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,

        minLength: 20,
        maxLength: 50
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },

    thumbnailPicture: {
        type: String,
        required: true
    },
    bookUrl: {
        type: [String],

    },
    availability: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: String,

    }

}, { timestamps: true })

const bookModel = mongoose.model("Book", bookSchema)

export default bookModel
