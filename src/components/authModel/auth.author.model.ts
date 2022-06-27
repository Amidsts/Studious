import { Schema, model, Types } from "mongoose";
import { roleTYPES } from "../../helpers/custom";

export interface IAuthorAccess {
    admin: Types.ObjectId,
    password: string;
    lastLogin: Date;
    role: roleTYPES[]
}

const authorAccessSchema =  new Schema({
    author : {
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

const Auth = model<IAuthorAccess>("authoraccess", authorAccessSchema)

export default Auth