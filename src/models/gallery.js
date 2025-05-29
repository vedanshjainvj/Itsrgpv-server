import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema({

    images : [
        {
            type : String
        }
    ],
    tag : {
        type: String,
        required : true
    }
})

const galleryModel = mongoose.model("Gallery", gallerySchema);

export default galleryModel;