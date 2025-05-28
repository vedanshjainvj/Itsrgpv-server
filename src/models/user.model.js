import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true,
        minLength: 2   
    },
    gender:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,  
    },
    userId:{
        type:String,
        required: true, 
    },
    email:{
        type:String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
        maxLength: 10
    },
    dob: {
        type: String,
        required: true
    },

    profilePic:{
        type:String,
    },
socialLinks: {
    instagram: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
  },
    enrollmentNumber: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    aboutUs: {
        type: String,
        required: true
    },
    skills: [],
    
}, {timestamps:true})

const userModel = mongoose.model("User", userSchema)

export default userModel