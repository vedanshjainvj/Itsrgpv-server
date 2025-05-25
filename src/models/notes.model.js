import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
        minLength: 3,
    },

    subjectCode: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number, // Change to String to handle numbers with leading zeros and long numbers
        required: true,
        match: /^[0-9]{10}$/, // Ensuring the contact number is exactly 10 digits
    },
    thumbnailPicture: {
        type: String, // Optional thumbnail URL or file path for the image
        required: false, // Marked as not required
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },

    // New fields
    nameOfPerson: {
        type: String,
        required: true,
    },
    batchOfPerson: {
        type: String,
        required: true, 
    },
    descriptionNotes: {
        type: String,
    },
    hashtags: {
        type: [String], 
        required: false, // Hashtags are optional
    },
    notesFile: {
        type: String,
    }
}, { timestamps: true });

const notesModel = mongoose.model("Notes", notesSchema);

export default notesModel;