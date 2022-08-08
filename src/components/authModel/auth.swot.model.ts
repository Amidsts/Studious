import { Schema, model, Types } from "mongoose";

export interface ISwotAuth {
    swotId: Types.ObjectId,
    password: string;
    lastLoggedIn: Date;
    isLoggedIn: boolean
}

const adminAuthSchema =  new Schema({
    adminId : {
        type: Schema.Types.ObjectId,
        ref: "swot"
    },
    password:{
        type: String,
        min: 5,
        max: 10,
        required: true
    },
    lastLoggedIn: {
        type: Date
    }
    
}, {timestamps: true})

const swotAccess = model<ISwotAuth>("swotauth", adminAuthSchema)

export default swotAccess