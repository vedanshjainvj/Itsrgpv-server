import mongoose, {Schema} from "mongoose";

const demandSchema = new Schema({
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
        unique: true
    },
    year: {
        type: Number,
        required: true,
        minLength: 4
    },
    topicOfFeedback: {
        type: String,
        required: true
    },

    supportAttachment:{
        type:String

    },
    rating: {
        type: String,
        enum:["1", "2", "3", "4", "5"]
        
    },
 
    demandTitle:{
        type:String
    },

    description: {
        type: String,
        required: true,
    }
    
}, {timestamps:true})

const demandModel = mongoose.model("Demand", demandSchema)

export default demandModel