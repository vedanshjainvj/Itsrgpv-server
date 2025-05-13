import mongoose, {Schema} from "mongoose";

const placementSchema = new Schema({
    studentFirstName:{
        type:String,
        required: true,
        minLength: 3   
    },
    studentLastName:{
        type:String,
        required: true,
        minLength: 3
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        required: true,
        maxLength: 10,
        unique: true
    },
    profilePicture:{
        type:String

    },
    skills: [{
        type: String,
        
    }],
    enrollmentNumber: {
        type: String,
        required: true,
    },
    company:{
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
    salaryPackage: {
        type: Number,
        required: true
    }
    
}, {timestamps:true})

const placementModel = mongoose.model("Placement", placementSchema)

export default placementModel