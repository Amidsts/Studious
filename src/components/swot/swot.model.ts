import { string } from "joi";
import {Schema, model, Types} from "mongoose" ;

export interface ISwot {
    firstName: string;
    lastName: string;
    phone?: string;
    email: string ;
    books_purchased:[ Types.ObjectId ],
    status: "online" | "offline" | "suspended"| "active",
    referralLink: string,
    referredBy: string,
    referralBonus: string,
    commentsMade: Array<string>
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
        books_purchased: [
            {
                type: Schema.Types.ObjectId,
                ref: "book"
            }
        ],
        referralLink: {
            type: String
        },
        referredBy: {
            type: String
        },
        referralBonus: {
            type: String
        },
        commentsMade: [
            {
                type: String
            }
        ]
    }, 
    {timestamps: true}
)
 const Swot = model<ISwot>("swot", adminSchema) ;

 export default Swot
