import mongoose, { Schema } from "mongoose";

const achievementSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    achievementDate: {
        type: Date,
        required: true
    },
    branch: {
        type: String,
    },
    fieldOfAchievement: [{
        type: String,
    }],
    enrollmentNumber: {
        type: String,
        required: true,
    },
    achievementTitle: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    achievementDescription: {
        type: String
    },
    recognitionLevel: [{
        type: String,
        enum: ["gold level", "silver level", "bronze level"]
    }],
    awards: {
        type: String
    },
    photos: {
        type: String
    },
    socialMediaLinks: [
        {
            type: String
        }
    ]

}, { timestamps: true })

const achievementModel = new mongoose.model("Achievement", achievementSchema)

export default achievementModel