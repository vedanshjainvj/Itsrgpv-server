import mongoose, {Schema} from "mongoose";

const scholarshipSchema = new Schema({
    organisationName:{
        type:String,
        required: true,
        minLength: 3   
    },
    organisationType:{
        type:String,
        enum:["Government", "Private"],
        required: true,
        
    },
    applyUrl:{
        type:String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    eligibilityCriteria: [{
        type: String
    }],

    documentRequired: [{
        type: String,
        
    }],
    contactInfo:[{
        type:String
    }]
    
    
}, {timestamps:true})

const scholarshipModel = mongoose.model("Scholarship", scholarshipSchema)

export default scholarshipModel