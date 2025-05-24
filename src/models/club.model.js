import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    clubName:{
        type:String,
        required: true,
        minLength: 3 ,
        unique: true 
    },
    founderName:{
        type:String,
        required: true,
        minLength: 3
    },
    description:{
        type:String,
        required: true,
        maxLength: 80
    },
    typeOfClub: {
        type: String,
        enum: ["Tech", "Non-tech", "Cultural", "Finance", "Graphic", "Robotic", "political"],
        required: true,
        
    },
    dateOfeshtablishment: {
        type: Date,
    },

    contactEmail:{
        type:String,
        unique: true

    },
    contactPhone: [{
        type: Number,
        maxlength: 10,
        unique: true
    }],
    socialLinks:[ {
        type: String,
    }],
    logoImg:{
        type: String,
    },
    coverImg:{
        type:String,
    }
    
}, {timestamps:true})

const clubModel = new mongoose.model("Club", clubSchema)

export default clubModel;