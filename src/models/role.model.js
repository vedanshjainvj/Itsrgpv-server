import mongoose, {Schema} from "mongoose";

const roleSchema = new Schema({
    roleName:{
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },  
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }  
}, {timestamps: true});

const roleModel = mongoose.model("Role", roleSchema);

export default roleModel;