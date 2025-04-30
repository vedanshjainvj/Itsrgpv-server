import mongoose, {Schema} from "mongoose";

const pyqSchema = new Schema({
    subjectName:{
        type:String,
        required: true,
        minLength: 3   
    },
    
    paperPublishYear: {
        type: Number,
        required: true,

    },
    semester:{
         type: String,
         required: true
    },

    paperType:{
        type:String,
        required: true,
    },

    paperForYear:{
         type: String,
         required: true
    },

    department:{
        type:String,

    },
    questionPaperImg: [{
        type: String,
        
    }],

    College: {
        type: String,
        enum:["UIT", "SOIT"],
        required: true,
    },
    department:{
        type: String,
        required: true, 
    },
    
}, {timestamps:true})

const pyqModel = mongoose.model("Pyq", pyqSchema)

export default pyqModel