import mongoose, {Schema} from "mongoose";

const topperSchema = new Schema({
    subjectName:{
        type:String,
        required: true,
        minLength: 3   
    },
    branch:{
        type:String,
        required: true,
        
    },
    subjectCode:{
        type:String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
        maxLength: 10
    },
    
    thumbnailPicture:{
        type:String,

    },
    year:{
        type: Number
    },
    

    department:{
        type: String,
        required: true, 
    },
    
    semester: {
        type: Number,
        required: true
    },
    
}, {timestamps:true})

const topperModel = mongoose.model("Topper", topperSchema)

export default topperModel