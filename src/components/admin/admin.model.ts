import {Schema, model} from "mongoose" ;

export interface IAdmin {
    firstName: string;
    lastName: string;
    phone?: string;
    email: string ;
    status: string 
}

const adminSchema = new Schema(
    {
        firstName:{
            type: String,
            required: true
        } ,
        lastName:{
            type: String,
            required: true
        } ,
        phone:{
            type: String,
            required: true
        } ,
        email:{
            type: String,
            required: true
        } ,
        password:{
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
        role: {
            type: String,
            default: "admin"
        }
    }, 
    {timestamps: true}
)
export const Admin = model<IAdmin>("admin", adminSchema) ;
