import {Schema, model} from "mongoose" ;
import {statusType} from "../../helpers/general"

export interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    email: string ;
    password: string ;
    status?: string ;
    verificationCode?: string;
    roles?: Array<string>;
}

const userSchema = new Schema(
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
        status:{
            type: String,
            enum: ["active", "inactive", "submitted"] ,
            default: "submitted"
        },
        verificationCode: {
            type: String,
            unique:true
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
                default: ""
            }
        ]
    }, 
    {timestamps: true}
)
const User = model<IUser>("user", userSchema) ;

export default User
