import { Schema, model } from "mongoose";
import { statusENUM} from "../../helpers/custom"
export interface IAuthor {
    // fullName: string;
    firstName: string;
    lastName:string;
    gender: string;
    email: string;
    status: statusENUM;
    aboutAuthor:string ;
    address: {
        country: string;
        state: string
        city: string;
        localGovt: string;
        postalCode:string;
    
    };
    bookPublished: {
        type: string
        ref: string ;
    }[];
    
}

const authorSchema = new Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended", "disabled"]
       
    },
    aboutAuthor: {
        type: String,
        required: true
    },
    address: {
        type: {
            country: String,
            state: String,
            city: String,
            localGovt: String,
            postalCode:String,
        },
        required: true
    
    },
    bookPublished: [
        {
            type: Schema.Types.ObjectId,
            ref: "books"
        }
    ]
}, {timestamps :true} )
const author= model<IAuthor>("authors", authorSchema) ;

export default author