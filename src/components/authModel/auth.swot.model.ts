import { Schema, model, Types } from "mongoose";

export interface IAdminAuth {
    adminId: Types.ObjectId,
    password: string;
    lastLoggedIn: Date;
    role: string
}

const adminAuthSchema =  new Schema({
    adminId : {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    password:{
        type: String,
        min: 5,
        max: 10,
        required: true
    },
    lastLoggedIn: {
        type: Date
    },
    role : {
        type: String,
        default: "admin"
    }
    
}, {timestamps: true})

const adminAccess = model<IAdminAuth>("adminauth", adminAuthSchema)

export default adminAccess