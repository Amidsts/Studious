import {Schema, model} from "mongoose" ;
import { adminstatusENUM, adminRoleENUM } from "../../helpers/custom";

export interface IAdmin {
    firstName: string;
    lastName: string;
    phone?: string;
    email: string ;
    status: adminstatusENUM ;
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
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
    }, 
    {timestamps: true}
)
export const Admin = model<IAdmin>("admin", adminSchema) ;
