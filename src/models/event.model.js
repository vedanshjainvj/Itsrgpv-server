import mongoose, {Schema} from "mongoose";

const eventSchema = new Schema({
    eventName:{
        type:String,
        required: true,
        minLength: 3   
    },
    description:{
        type:String,
        required: true,
        
    },
    organisedBy:{
        type:String,
        required: true,
    },
    venue: {
        type: String,
        required: true,

    },
    dateOfEvent: {
        type: Date
    },

    bannerPicture:{
        type:String,

    },
    eventImages: [{
        type: String,
        
    }],
    eventType:{
            type: String,
            enum: ["Tech", "Non-tech", "Cultural", "Finance", "Graphic", "Robotic", "political"]
    },
    targetAudience:[{
        type: String, 
    }],
    tags: {
        type: String,
        
    },
    
    
}, {timestamps:true})

const eventModel = mongoose.model("Event", eventSchema)

export default eventModel