import mongoose, {Schema} from "mongoose";

const departmentSchema = new Schema({
    departmentName:{
        type:String,
        required: true,
        minLength: 3 ,
        unique: true 
    },
    descriptionOfDepartment:{
        type:String,
        required: true,

    },
    headOfDepartment:{
        type:String,
        required: true,
    },
    totalSeats: {
        type: Number,
        required: true,
        
    },
    yearOfEstablishment: {
        type: Number,
        required: true
    },

    contactEmail:{
        type:String,
        unique: true

    },
    departmentImages: [{
        type: String,
    }],
    contactPhone: {
        type: Number,
        required: true
    }
}, {timestamps:true})

const departmentModel = mongoose.model("Department", departmentSchema)

export default departmentModel;