import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
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
    dateOfBirth: {
        type: Date,
        required: true
    },

    profilePicture:{
        type:String,
    },
    role: [{
        type: String,
    }],
    enrollmentNumber: {
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true, 
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

const userModel = mongoose.model("User", userSchema)

export default userModel