import mongoose, {Schema} from "mongoose";

const videoSchema = new Schema({
videoReel:{
 type: String,
 
}
    
}, {timestamps:true})

const videoModel = mongoose.model("Video", videoSchema)

export default videoModel