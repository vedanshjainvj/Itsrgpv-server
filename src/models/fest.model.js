import mongoose, {Schema} from "mongoose";

const festSchema = new Schema({
    festName:{
        type:String,
        required: true,
        minLength: 3   
    },
    organisedBy:{
        type:String,
        required: true,
        
    },
    sponsor:{
        type:String,
    },
    description: {
        type: String,
        required: true,
        maxLength: 80
    },
    dateOfEvent: {
        type: Date,
    },

    bannerPicture:{
        type:String,
    },
    festImages: [{
        type: String,
        
    }],
    theme: {
        type: String,
        
    },
    chiefGuest:{
        type: String,
        
    },
    festVideo: {
        type:String,
        default : "https://youtu.be/T1b6zmqLydA?feature=shared"
    },
    listOfActivities: [{
        type:String
    }]
    
}, {timestamps:true})

const festModel = mongoose.model("Fest", festSchema)

export default festModel