import mongoose, {Schema} from "mongoose";

const suggestSchema = new Schema({
    firstName:{
        type:String,
        required: true,
        minLength: 3   
    },
    lastName:{
        type:String,
        required: true,
        minLength: 3
    },
    email:{
        type:String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
        maxLength: 10
    },
    branch: {
        type: String,
        required: true
    },

    topicOfFeedback:{
        type:String,

    },
    supportingAttchment: [{
        type: String,
        
    }],
    enrollmentNumber: {
        type: String,
        required: true,
    },
    descriptionOfFeedback:{
        type: String,
        
    },
    passoutYear: {
        type:Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    
}, {timestamps:true})

const suggestModel = mongoose.model("Suggest", suggestSchema)

export default suggestModel