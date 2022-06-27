import { Schema, model, Types } from "mongoose";
import { roleTYPES } from "../../helpers/enumAndTypes";

export interface IAdminAuth {
    admin: Types.ObjectId,
    password: string;
    lastLogin: Date;
    role: roleTYPES
}

const adminAuthSchema =  new Schema({
    admin : {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    password : {
        type: String,
        required: true
    },
    lastLogin : Date,
    role : [String]
    
}, {timestamps: true})

const Auth = model<IAdminAuth>("adminauth", adminAuthSchema)

export default Auth