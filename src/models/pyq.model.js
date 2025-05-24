import mongoose, { Schema } from "mongoose";

const pyqSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
        minLength: 3   
    },
    
    subjectCode: {
        type: String,
        required: true,
        minLength: 2
    },

    paperPublishYear: {
        type: Number,
        required: true,
    },

    semester: {
        type: Number,
        required: true
    },

    // ✅ Enum for paper type
    paperType: {
        type: String,
        enum: ["assignment", "midsem", "endsem", "back"],  // Fixed values
        required: true,
    },

    paperForYear: {
        type: Number,
        required: true
    },

    department: {
        type: String,
        required: true,
    },

    questionPaperImg: {
        type : String,
    },

    college: {
        type: String,
        enum: ["UIT", "SOIT"],  // Valid values for College
        required: true,
    },

}, { timestamps: true });

const pyqModel = mongoose.model("Pyq", pyqSchema);

export default pyqModel;