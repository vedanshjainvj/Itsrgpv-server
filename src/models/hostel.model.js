import mongoose, {Schema} from "mongoose";

const hostelSchema = new Schema({
    hostelName:{
        type:String,
        required: true,
        minLength: 3   
    },
    hostelMessCharges:{
        type:Number,
        required: true,
        
    },
    hostelWardenName:{
        type:String,
        required: true,
    },
    totalStudentsInHostel: {
        type: Number,
        required: true,

    },
    hostelPictures: [{
        type: Date,
        required: true
    }],

    hostelEvents:[{
        type:String,

    }],
    HostelFacilities: [{
        type: String,
        
    }],
    hostelRating: {
        type: String,
        enum:["1", "2", "3", "4", "5"]
    },
    hostelWardenContactNumber:{
        type: String,
        required: true, 
    },
    roomsInHostel: {
        type:Number,
        required: true
    },
    messRating: {
        type: Number,
        enum:["1", "2", "3", "4", "5"]
    },
    hostelFeesPerSemester: {
        type: Number
    }
    
}, {timestamps:true})

const hostelModel = mongoose.model("Hostel", hostelSchema)

export default hostelModel