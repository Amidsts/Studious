import { Schema, model, Types } from "mongoose";

export interface IAuthorAccess {
    author: Types.ObjectId,
    password: string;
    lastLogin: Date;
    isLoggedIn: boolean;
    role: string
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
    role : {
        type: String,
        default: "author"
    }
    
}, {timestamps: true})

const Auth = model<IAuthorAccess>("authoraccess", authorAccessSchema)

export default Auth