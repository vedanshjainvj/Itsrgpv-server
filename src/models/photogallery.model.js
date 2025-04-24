import mongoose, {Schema} from "mongoose";

const photogallerySchema = new Schema({

    images:[{
        type:String
    }]
    
}, {timestamps:true})

const photogalleryModel = mongoose.model("Photogallery", photogallerySchema)

export default photogalleryModel