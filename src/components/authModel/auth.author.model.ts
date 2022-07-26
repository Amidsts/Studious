import { Schema, model, Types } from "mongoose";
import { roleTYPES } from "../../helpers/custom";

export interface IAuthorAccess {
    author: Types.ObjectId,
    password: string;
    lastLogin: Date;
    isLoggedIn: Boolean;
    role: roleTYPES[] 
}

const authorAccessSchema =  new Schema({
    author : {
        type: Schema.Types.ObjectId,
        ref: "author"
    },
    password : {
        type: String,
        required: true
    },
    lastLogin : Date,
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    },
    role : [String]
    
}, {timestamps: true})

const Auth = model<IAuthorAccess>("authoraccess", authorAccessSchema)

export default Auth