import mongoose, {Schema} from "mongoose";

const startupSchema = new Schema({
    startupName:{
        type:String,
        required: true,
        minLength: 3,
        unique:true  
    },
    slogan:{
        type:String,
        minLength: 3
    },
    description:{
        type:String,
        required: true,
    },
    startupCategory: {
        type: String,
        required: true,
        
    },
    dateOfEshtablishment: {
        type: Date,
        required: true
    },
    
    startupLogo:{
        type:String,

    },
    founder: [{
        type: String,
        
    }],
    contactEmail: {
        type: String,
        required: true,
        unique:true
    },
    contactPhone:{
        type: String,
        required:true
    },
    socialLinks: [{
        type:String,
        
    }],
    offilneLocation: {
        type: String,

    },
    
}, {timestamps:true})

const startupModel = mongoose.model("Startup", startupSchema)

export default startupModel