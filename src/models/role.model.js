import mongoose, {Schema} from "mongoose";

const roleSchema = new Schema({
    roleName:{
        type:String,
        required: true,
        minLength: 3   ,
        unique:true
    },  
    createdDate :{
        type:Date,
        required: true,
        unique:true
    }  
}, )

const pyqModel = mongoose.model("roleModels", roleSchema)

export default pyqModel